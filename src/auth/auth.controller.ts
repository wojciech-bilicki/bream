import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    return this.authService.register({ email, password });
  }
}
