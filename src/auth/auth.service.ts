import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import PostgresErrorCode from "src/database/postgresErrorCodes";
import CreateUserDto from "src/user/user.create.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register({ password, email }: CreateUserDto) {
    // TODO: add validation
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.userService.create({
        email,
        password: hashedPassword,
      });
      user.password = undefined;
      return user;
    } catch (e) {
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("Email taken", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
