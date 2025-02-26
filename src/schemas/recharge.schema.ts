import Joi from 'joi';
import { CreateRechargeDTO } from '../protocols/recharge.types';

export const rechargeSchema = Joi.object<CreateRechargeDTO>({
  phone_id: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'O ID do telefone deve ser um número',
      'number.integer': 'O ID do telefone deve ser um número inteiro',
      'number.positive': 'O ID do telefone deve ser um número positivo',
      'any.required': 'O ID do telefone é obrigatório'
    }),
  value: Joi.number().min(10).max(1000).required()
    .messages({
      'number.base': 'O valor deve ser um número',
      'number.min': 'O valor mínimo de recarga é R$ 10',
      'number.max': 'O valor máximo de recarga é R$ 1000',
      'any.required': 'O valor da recarga é obrigatório'
    })
});