import ClubValidation from "../helper/ClubValidation";
import ErrorHandler from "../helper/ErrorHelper";
import { IClub } from "../interfaces/club.interface";
import { Clubs, Hobbies, Users, UsersClubs } from "../models";
import { ValidationResult } from 'joi';
import IHobby from "../interfaces/hobby.interface";
import HobbyValidation from "../helper/Hobbyalidation";

export default class ClubService {
  clubValidation = new ClubValidation()
  hobbyValidation = new HobbyValidation();

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

  public createClub = async (clubInfo: IClub): Promise<any> => {
    const error: ValidationResult = this.clubValidation.validateNewClub(clubInfo);
    if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    const { adminId, name } = clubInfo;
    const newClub = await Clubs.create({ name, adminId }, {
      include: [{ model: Users, as: 'admin' },
    { model: Hobbies, as: 'hobbies' },
    { model: Users, as: 'user' }]},);
    await UsersClubs.create({ userId: adminId, clubId: newClub.id });
    return newClub;
  }

  public createHobbie = async (nHobby: IHobby, clubId: string) => {
    const error: ValidationResult = this.hobbyValidation.validateNewHobby(nHobby);
    if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    const { name, type } = nHobby;
    const createdHobby = await Hobbies.create({ name, type, finished: false, clubId });
    return createdHobby;
  }

  public finishHobbie = async (clubId: string, hobbyId: string) => {
    const finishedHobby = await Hobbies.update({ finished: true }, { where: { id: hobbyId, clubId } });
  }
}