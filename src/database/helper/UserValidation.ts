import Joi from "joi";
import { IUser, IUserLogin } from "../interfaces/user.interface";

export default class UserValidation {
  public validateSignUp = (body: IUser) => {
    return Joi.object({
      username: Joi.string().required().min(3).messages({
        'string.empty': `Username cannot be an empty field`,
        'string.min': `Username should have a minimum length of {#limit}`,
      }),
      email: Joi.string().required().min(6).email().messages({
        'string.empty': `E-mail cannot be an empty field`,
        'string.min': `E-mail should have a minimum length of {#limit}`,
        'string.email': `Invalid e-mail`,
      }),
      password: Joi.string().required().min(6).messages({
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
      }),
    }).validate(body);
  }

  public validateLogIn = (body: IUserLogin) => {
    return Joi.object({
      email: Joi.string().required().min(4).email().messages({
        'string.empty': `E-mail cannot be an empty field`,
        'string.min': `E-mail should have a minimum length of {#limit}`,
        'string.email': `Invalid e-mail`,
      }),
      password: Joi.string().required().min(6).messages({
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
      }),
    }).validate(body);
  }
};
