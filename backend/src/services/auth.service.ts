import bcrypt from "bcrypt";
import { ILoginInput, ILoginResponse, IRegisterInput } from "../types";
import { TokenUtils } from "../utils/token.utils";
import { UserService } from "./user.service";
import { AuthError } from "../utils/errors/AuthError";
import { IPublicUser } from "../types";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(data: IRegisterInput): Promise<IPublicUser> {
    await this.userService.checkForEmailAvailability(data.email);

    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.userService.createUser({
      email: data.email,
      name: data.name,
      passwordHash,
    });
  }

  async login(data: ILoginInput): Promise<ILoginResponse> {
    const user = await this.userService.getUserByEmailWithPassword(data.email);

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
