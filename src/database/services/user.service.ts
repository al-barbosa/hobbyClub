import { IUser } from '../interfaces/user.interface';
import UsersModel from '../models/users.model';

export default class UserService {
  // private getAllClubs = async (allUsers: UsersModel[]) => {
  //   const usersWithClub = []
  //   Promise.all(allUsers.map( async (user: any) => {
  //     const { dataValues } = user;
  //     const clubs = await ClubsModel.findByPk
  //   }))
  // }

  public getAll = async (): Promise<any> => {
    const allUsers: UsersModel[] = await UsersModel.findAll();
    // await this.getAllClubs(allUsers);
    return allUsers;
  };
}
