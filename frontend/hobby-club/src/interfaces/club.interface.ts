import IHobby from "./hobby.interface";
import { IUser } from "./user.interface";

export default interface IClub {
  id: number,
  name: string,
  hobbies: IHobby[],
  admin: IUser,
  user: IUser[],
}