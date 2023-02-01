import IHobby from "./hobby.interface";
import IUserClubs from "./userClub.interface";

export interface IClub {
  id?: number,
  name: string,
  adminId: number,
  created_at?: string,
  updated_at?: string,
  hobbies?: IHobby[],
}

export interface IClubUsersHobbies extends IClub {
  usersClubs: IUserClubs,
  hobbies: IHobby[],
}

