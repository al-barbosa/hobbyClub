import { Request, Response } from 'express';
import IError from '../interfaces/error.interface';
import HobbyService from '../services/hobby.service';

export default class HobbyController {
  hobbyService = new HobbyService();

  public getHobby = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchedHobby = await this.hobbyService.getHobby(req.params.id);
      return res
        .status(200)
        .json(searchedHobby);
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  };

  public postMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.hobbyService.postMessage(req.params.id, req.params.user, req.body.text);
      return res
        .status(200)
        .json({ message: 'Message posted' });
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  };

  public deleteMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.hobbyService.deleteMessage(req.params.messageId);
      return res
        .status(200)
        .json({ message: 'Message deeleted' });
    } catch (e) {
      const { code, message } = e as IError;
      return res
        .status(code)
        .json({ message });
    }
  };
}