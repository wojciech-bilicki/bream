import { Controller, Get, UseGuards } from "@nestjs/common";
import JwtAuthGuard from "src/auth/jwtAuth.guard";

@Controller("collections")
export class CollectionsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async getCollections() {
    return "You should get collections";
  }
}
