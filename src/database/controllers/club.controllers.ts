import { Request, Response } from 'express';
import IError from '../interfaces/error.interface';
import ClubService from '../services/club.service';

export default class ClubController {
  clubService = new ClubService();

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const allUsers = await this.clubService.getAll();
    return res
      .status(200)
      .json(allUsers);
  };

  public getClub = async (_req: Request, res: Response): Promise<Response> => {
    try{
      const searchedClub = await this.clubService.getAll();
      return res
        .status(200)
        .json(searchedClub);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  };
}
