import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

class UserNotFoundException extends HttpException {
  constructor(email: string) {
    super(`User with email ${email} not found`, HttpStatus.NOT_FOUND);
  }
}

class UserNotFoundException2 extends NotFoundException {
  constructor(email: string) {
    super(`User with email ${email} not found`);
  }
}
