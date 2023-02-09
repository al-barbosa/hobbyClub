import IHobbyMessage from "./message.interface";

export default interface IHobby {
  clubId: number,
  createdAt: string,
  finished: boolean,
  id: number,
  name: string,
  type: string,
  updatedAt: string,
  img: string,
  messages?: IHobbyMessage[]
}