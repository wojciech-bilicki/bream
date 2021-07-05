import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findById(id: string) {
    const user = await this.userRepo.findOne({ id });
    if (user) {
      return user;
    }

    throw new HttpException(
      "User with this id does not exist",
      HttpStatus.NOT_FOUND,
    );
  }
}
