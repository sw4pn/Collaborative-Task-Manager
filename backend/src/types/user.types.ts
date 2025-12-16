export interface ICreateUserInput {
  email: string;
  passwordHash: string;
  name: string;
}

export interface IUpdateUserInput {
  name?: string;
  passwordHash?: string;
}
