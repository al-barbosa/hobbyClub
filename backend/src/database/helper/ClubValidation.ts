import Joi from "joi";
import { IClub } from "../interfaces/club.interface";

export default class ClubValidation {
  public validateNewClub = (body: IClub) => {
    return Joi.object({
      name: Joi.string().required().min(4).messages({
        'string.empty': `Club name cannot be an empty field`,
        'string.min': `Club name should have a minimum length of {#limit}`,
      }),
      adminId: Joi.string().required().messages({
        'string.empty': `Club needs an admin`,
      }),
    }).validate(body);
  }
};
