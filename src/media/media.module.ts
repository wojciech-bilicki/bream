import { Module } from "@nestjs/common";
import { GamesModule } from "src/games/games.module";
import { MediaController } from "./media.controller";

@Module({
  imports: [GamesModule],
  controllers: [MediaController],
})
export class MediaModule {}
