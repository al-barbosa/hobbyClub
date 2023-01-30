import ErrorHandler from "../helper/ErrorHelper";
import { Clubs, Hobbies, Users } from "../models";

export default class ClubService {
  public getAll = async (): Promise<Clubs[]> => {
    const allClubs = await Clubs.findAll({
      include: [{ model: Users, as: 'admin' },
      { model: Hobbies, as: 'hobbies' },
      { model: Users, as: 'user' }],
    });
    return allClubs;
  }
  public getClub = async (id: string): Promise<Clubs> => {
    const searchedClub = await Clubs.findByPk(id, {
      include: [{ model: Users, as: 'admin' },
      { model: Hobbies, as: 'hobbies' },
      { model: Users, as: 'user' }],
    });
    if (!searchedClub) throw new ErrorHandler('Club not found', 404);
    return searchedClub;
  }
}