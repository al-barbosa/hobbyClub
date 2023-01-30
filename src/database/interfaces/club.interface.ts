import IHobby from "./hobby.interface";
import IUserClubs from "./userClub.interface";

export interface IClub {
  id: number,
  name: string,
  admin_id?: number,
  created_at?: string,
  updated_at?: string,
  usersClubs?: IUserClubs,
  hobbies?: IHobby[],
}

export interface IClubUsersHobbies extends IClub {
  usersClubs: IUserClubs,
  hobbies: IHobby[],
}

