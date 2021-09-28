import { Body, Controller, Post } from "@nestjs/common";
import CreateGameDTO from "./game.dto";
import GamesService from "./games.service";

@Controller("games")
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post("create")
  async create(@Body() gameData: CreateGameDTO) {
    return this.gamesService.create(gameData);
  }
}
