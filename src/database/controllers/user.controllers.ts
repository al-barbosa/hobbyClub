import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  userService = new UserService();

  public getAll = async (_req: Request, res: Response): Promise<any> => {
    const allUsers = await this.userService.getAll();
    res.status(200).json(allUsers);
  };
}
