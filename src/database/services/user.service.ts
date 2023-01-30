import ErrorHandler from '../helper/ErrorHelper';
import { Clubs, Users } from '../models/index';

export default class UserService {
  public getAll = async (): Promise<Users[]> => {
    const allUsers = await Users.findAll({
      include: { model: Clubs, as: 'club', include: ['hobbies'] },
    });
    return allUsers;
  };

  public getUser = async (id: string): Promise<Users> => {
    const searchedUser = await Users.findByPk(id, {
      include: { model: Clubs, as: 'club', include: ['hobbies'] }
    });
    if (!searchedUser) throw new ErrorHandler('User not found', 404);
    return searchedUser;
  }
}
