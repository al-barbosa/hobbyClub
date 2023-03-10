import ErrorHandler from '../helper/ErrorHelper';
import { Clubs, UserMessages, Users, UsersClubs } from '../models/index';
import * as bcrypt from 'bcryptjs';
import { IUser, IUserToken, IUserLogin } from '../interfaces/user.interface';
import TokenHandler from '../helper/TokenHelper';
import UserValidation from '../helper/UserValidation';
import { ValidationResult } from 'joi';

export default class UserService {
  tokenHandler = new TokenHandler();
  userValidaton = new UserValidation();

  public getAll = async (): Promise<Users[]> => {
    const allUsers = await Users.findAll({
      include: { model: Clubs, as: 'club', include: ['hobbies'] },
      attributes: { exclude: ['password'] },
    });
    return allUsers;
  };

  public getUser = async (id: string): Promise<Users> => {
    const searchedUser = await Users.findByPk(id, {
      include: { model: Clubs, as: 'club', include: ['hobbies'] },
      attributes: { exclude: ['password'] },
    });
    if (!searchedUser) throw new ErrorHandler('User not found', 404);
    return searchedUser;
  }

  public login = async (loginInfo: IUserLogin): Promise<IUserToken> => {
    const error: ValidationResult = this.userValidaton.validateLogIn(loginInfo)
    if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    const { email, password } = loginInfo;

    const userInfo = await Users.findOne( {
      where: { email },
      raw: true
    }) as IUser;
    if (!userInfo) throw new ErrorHandler('User not found', 404);

    const { password: hashedPassword } = userInfo;
    const checkHash = bcrypt.compareSync(password, hashedPassword);
    if (!checkHash) throw new ErrorHandler('Incorrect email or password', 404);

    const { id, username } = userInfo;
    const token = this.tokenHandler.createToken(loginInfo);
    const answer = { email, id, username, token }
    return answer;
  }

  public createUser = async (userInfo: IUser): Promise<IUserLogin> => {{
    const error: ValidationResult = this.userValidaton.validateSignUp(userInfo)
    if (error.error?.message) throw new ErrorHandler(error.error?.message, 404);

    const { email, password, username} = userInfo;

    const checkEmail = await Users.findOne( { where: { email } }) as IUser;
    if(checkEmail) throw new ErrorHandler('Email already registered', 404);

    var hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT);

    const nUser = await Users.create({ email, password: hashedPassword, username }, { include: { model: Clubs, as: 'club', include: ['hobbies'] }});

    const { id } = nUser;

    const token = this.tokenHandler.createToken({ email, password });

    const createdUser = { email, password, username, id, token }

    return createdUser;
  }}

  public joinClub = async (userId: string, clubId: string): Promise<void> => {
    const checkUserClub = await UsersClubs.findOne({ where: { userId, clubId }})
    // if (checkUserClub) throw new ErrorHandler('User already joined club', 404);

    await UsersClubs.create({ userId, clubId });
  }

  public leftClub = async (userId: string, clubId: string): Promise<void> => {
    const checkUserClub = await UsersClubs.findOne({ where: { userId, clubId }})
    // if (checkUserClub) throw new ErrorHandler('User did not joined club', 404);
    console.log('check')

    await UsersClubs.destroy({ where: { userId, clubId }});
  }

  public getMessages = async (userId: string): Promise<UserMessages[]> => {
    const messages = await UserMessages.findAll({ where: { receiver_id: userId }});
    return messages;
  }
}
