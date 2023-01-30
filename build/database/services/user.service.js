"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
class UserService {
    constructor() {
        // private getAllClubs = async (allUsers: UsersModel[]) => {
        //   const usersWithClub = []
        //   Promise.all(allUsers.map( async (user: any) => {
        //     const { dataValues } = user;
        //     const clubs = await ClubsModel.findByPk
        //   }))
        // }
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield index_1.Users.findAll();
            // await this.getAllClubs(allUsers);
            return allUsers;
        });
    }
}
exports.default = UserService;
