import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/user.interface';
import ErrorHandler from './ErrorHelper';

const secret = process.env.JWT_SECRET;
const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
}

export default class TokenHandler {
  public createToken = (user: IUserLogin) => jwt.sign({ ...user }, secret as jwt.Secret, jwtConfig);

  public validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization: token } = req.headers;

    if (!token) throw new ErrorHandler('Email already registered', 404);
    // return res.status(404).json({ message: 'Token not found' });

    jwt.verify(token, secret as jwt.Secret, (err, user) => {
      if (err) throw new ErrorHandler('Email already registered', 404);
      //  res.status(404).json({ message: 'Invalid token' });
      next();
    });
  }
}
