import Joi from 'joi';

export const rechargeSchema = Joi.object({
  phone_id: Joi.number().required(),
  value: Joi.number().min(10).max(1000).required()
});