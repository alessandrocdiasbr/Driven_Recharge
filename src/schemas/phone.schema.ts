import Joi from 'joi';
import { CreatePhoneDTO } from '../protocols/phone.types';

export const phoneSchema = Joi.object<CreatePhoneDTO>({
  number: Joi.string().length(11).required()
    .messages({
      'string.length': 'O número de telefone deve ter exatamente 11 dígitos',
      'any.required': 'O número de telefone é obrigatório'
    }),
  name: Joi.string().required()
    .messages({
      'any.required': 'O nome é obrigatório'
    }),
  description: Joi.string().required()
    .messages({
      'any.required': 'A descrição é obrigatória'
    }),
  document: Joi.string().length(11).required()
    .messages({
      'string.length': 'O documento deve ter exatamente 11 dígitos',
      'any.required': 'O documento é obrigatório'
    }),
  carrier_id: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'O ID da operadora deve ser um número',
      'number.integer': 'O ID da operadora deve ser um número inteiro',
      'number.positive': 'O ID da operadora deve ser um número positivo',
      'any.required': 'O ID da operadora é obrigatório'
    })
});