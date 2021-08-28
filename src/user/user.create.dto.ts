import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  password: string;

  @IsBoolean()
  subscribedToNewsletter: boolean;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;
}

export default CreateUserDto;
