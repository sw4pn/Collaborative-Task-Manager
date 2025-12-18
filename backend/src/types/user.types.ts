export interface ICreateUserInput {
  email: string;
  passwordHash: string;
  name: string;
}

export interface IUpdateUserInput {
  name?: string;
  passwordHash?: string;
}

export interface IPublicUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
