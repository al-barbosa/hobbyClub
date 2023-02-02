import IClub from "./club.interface";

export interface IUser {
  id: string,
  username: string,
  email: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface IUserClubs extends IUser {
  clubs: IClub[]
  token: string,
}