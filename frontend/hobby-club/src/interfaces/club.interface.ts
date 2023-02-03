import IHobby from "./hobby.interface";

export default interface IClub {
  id: number,
  name: string,
  hobbies: IHobby[],
}