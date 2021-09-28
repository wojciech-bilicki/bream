import { IsNotEmpty, IsString } from "class-validator";

class CreateGameDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export default CreateGameDTO;
