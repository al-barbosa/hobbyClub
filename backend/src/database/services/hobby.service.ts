import ErrorHandler from "../helper/ErrorHelper";
import { Hobbies, HobbyMessages } from "../models";
// import { ValidationResult } from 'joi';

export default class HobbyService {
  public getHobby = async (id: string): Promise<any> => {
    const searchedClub: any = await Hobbies.findByPk(id, { raw: true });
    if (!searchedClub) throw new ErrorHandler('Hobby not found', 404);
    const getMessages = await HobbyMessages.findAll( { where: { hobby_id: id }, raw: true } )
    searchedClub.messages = getMessages;
    return searchedClub;
  };

  public postMessage = async (hobbyId: string, userId: string, text: string) => {
    await HobbyMessages.create({
      hobby_id: hobbyId,
      user_id: userId,
      text
    })
  };

  public deleteMessage = async (messageId: string) => {
    await HobbyMessages.destroy({ where: { id: messageId } })
  }
}