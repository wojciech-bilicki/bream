import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create } from "domain";
import { Repository } from "typeorm";
import CreateGameDTO from "./game.dto";
import Game from "./game.entity";

@Injectable()
class GamesService {
  constructor(@InjectRepository(Game) private gameRepo: Repository<Game>) {}

  async create(gameData: CreateGameDTO) {
    const newGame = await this.gameRepo.create(gameData);
    await this.gameRepo.save(newGame);
    return newGame;
  }
}

export default GamesService;
