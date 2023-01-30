import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

const secret = process.env.JWT_SECRET;
const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
}

export default class TokenHandler {
  public createToken = (user: IUser) => jwt.sign({ ...user }, secret as jwt.Secret, jwtConfig);

  public validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization: token } = req.headers;

    if (!token) return res.status(404).json({ message: 'Token not found' });

    jwt.verify(token, secret as jwt.Secret, (err, user) => {
      if (err) return res.status(404).json({ message: 'Invalid token' });
      console.log(user)
      req.body = { ...req.body, user };
      next();
    });
  }
}
