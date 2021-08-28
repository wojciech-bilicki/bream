import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./localAuth.guard";
import RequestWithUser from "./interfaces/requestWithUser.i";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import JwtAuthGuard from "./jwtAuth.guard";
import CreateUserDto from "src/user/user.create.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registrationData: CreateUserDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user);
    response.setHeader("Set-Cookie", cookie);
    return response.send(user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logOut(@Req() _request: RequestWithUser, @Res() response: Response) {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogout());
    response.send();
  }
}
