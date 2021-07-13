import User from "src/user/user.entity";

interface TokenPayload {
  user: User;
}

export default TokenPayload;
