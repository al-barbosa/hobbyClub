import { IUser } from './user.interface';

export interface IUserMessage {
  id: number,
  read: boolean,
  receiver_id: number,
  sender_id: number,
  text: string,
  createdAt: string,
  updatedAt: string,
  user: IUser,
}

export default interface IHobbyMessage {
  id: number,
  hobby_id: number,
  user_id: number,
  text: string,
  createdAt: string,
  updatedAt: string,
  user: IUser,
}

export interface IClubMessage {
  id: number,
  club_id: number,
  user_id: number,
  text: string,
  createdAt: string,
  updatedAt: string,
  user: IUser,
}
