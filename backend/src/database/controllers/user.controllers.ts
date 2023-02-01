import { Request, Response } from 'express';
import IError from '../interfaces/error.interface';
import { IUser } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {
  userService = new UserService();

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const allUsers = await this.userService.getAll();
    return res
      .status(200)
      .json(allUsers);
  };

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchedUser = await this.userService.getUser(req.params.id);
      return res.status(200).json(searchedUser);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loggedUser = await this.userService.login(req.body);
      return res.status(200).json(loggedUser);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const token: string = await this.userService.createUser(req.body);
      return res
        .status(200)
        .json({ token });
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  }

  public joinClub = async (req: Request, res: Response) => {
    try {
      await this.userService.joinClub(req.params.id, req.params.club);
      return res
        .status(200)
        .json({ message: `User ${req.params.id} joined club ${req.params.club}` });
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  }
}
