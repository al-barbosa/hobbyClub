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

  public getClub = async (req: Request, res: Response): Promise<Response> => {
    try{
      const searchedClub = await this.clubService.getClub(req.params.id);
      return res
        .status(200)
        .json(searchedClub);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    };
  };

  public createClub = async (req: Request, res: Response): Promise<Response> => {
    try{
      const newClub = await this.clubService.createClub(req.body);
      return res
        .status(200)
        .json(newClub);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    };
  };

  public createHobby = async (req: Request, res: Response): Promise<Response> => {
    try{
      const newHobby = await this.clubService.createHobbie(req.body, req.params.id);
      return res
        .status(200)
        .json(newHobby);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    };
  };

  public finishHobby = async (req: Request, res: Response): Promise<Response> => {
    const finishedHobby = await this.clubService.finishHobbie(req.params.id, req.params.hobby);
    return res
        .status(200)
        .json(finishedHobby);
  }
}
