export default interface IMessage {
  id: number,
  read: boolean,
  receiver_id: number,
  sender_id: number,
  text: string,
  createdAt: string,
  updatedAt: string,
}