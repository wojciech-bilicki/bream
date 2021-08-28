import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import PostgresErrorCode from "src/database/postgresErrorCodes";
import CreateUserDto from "src/user/user.create.dto";
import User from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import TokenPayload from "./interfaces/tokenPayload.i";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registrationData: CreateUserDto) {
    // TODO: add validation
    try {
      const hashedPassword = await bcrypt.hash(registrationData.password, 12);
      const user = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      user.password = undefined;
      return user;
    } catch (e) {
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        const uniqueProperty = e?.detail.includes("email")
          ? "email"
          : "displayName";
        throw new HttpException(
          {
            message: [
              {
                property: uniqueProperty,
                constraints: {
                  unique: `${uniqueProperty} already taken`,
                },
              },
            ],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {}
  }

  public getCookieWithJwtToken(user: User) {
    const payload: TokenPayload = { user };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; domain: 'localhost', HttpOnly; Secure; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME",
    )}`;
  }

  public getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age:0`;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const arePasswordsMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!arePasswordsMatching) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
