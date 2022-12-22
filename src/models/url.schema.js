import Joi from "joi";

export const urlSchema = joi.object({
    url : Joi.string().uri().required()
})