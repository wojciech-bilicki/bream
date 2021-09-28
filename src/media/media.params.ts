import { IsNotEmpty, IsString } from "class-validator";

class MediaParams {
  @IsNotEmpty()
  @IsString()
  gameId: string;
}

export default MediaParams;
