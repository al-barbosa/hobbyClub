import { IClubUsersHobbies } from "./club.interface";

export interface IUser {
  id?: number,
  username: string,
  email: string,
  password: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface IUserComplete extends IUser {
  club: IClubUsersHobbies[],
}

export interface IUserLogin {
  email: string,
  password: string,
}

export interface IUserToken {
  id?: number,
  username: string,
  email: string,
  token: string
}
