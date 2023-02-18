import Joi from "joi";
import IHobby from "../interfaces/hobby.interface";

export default class HobbyValidation {
  public validateNewHobby = (body: IHobby) => {
    return Joi.object({
      name: Joi.string().required().min(4).messages({
        'string.empty': `Hobby name cannot be an empty field`,
        'string.min': `Hobby name should have a minimum length of {#limit}`,
      }),
      type: Joi.string().required().messages({
        'string.empty': `Type is required`,
      }),
      img: Joi.string(),
    }).validate(body);
  }
};
