import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from "@nestjs/common";
import GamesService from "src/games/games.service";

class MediaGuard implements CanActivate {
  constructor(@Inject(GamesService) private gameService: GamesService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const gameId = request.params.gameId;
    const game = await this.gameService.getById(request.params.gameId);
    if (!game) {
      throw new BadRequestException(`Game with ${gameId} does not exist`);
    }
    return !!game;
  }
}

export default MediaGuard;
