import bcrypt from "bcrypt";
import {
  ILoginInput,
  ILoginResponse,
  IRegisterInput,
} from "../types/auth.types";
import { User } from "../generated/prisma/client";
import { TokenUtils } from "../utils/token.utils";
import { UserService } from "./user.service";
import { AuthError } from "../utils/errors/AuthError";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(data: IRegisterInput): Promise<User> {
    await this.userService.checkForEmailAvailability(data.email);

    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.userService.createUser({
      email: data.email,
      name: data.name,
      passwordHash,
    });
  }

  async login(data: ILoginInput): Promise<ILoginResponse> {
    const user = await this.userService.getUserByEmail(data.email, true);

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new AuthError("Invalid email or password");
    }

    const tokens = TokenUtils.issueTokens(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
