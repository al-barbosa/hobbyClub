import { Request, Response } from 'express';
import IError from '../interfaces/error.interface';
import UserService from '../services/user.service';

export default class UserController {
  userService = new UserService();

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const allUsers = await this.userService.getAll();
    return res.status(200).json(allUsers);
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
}
