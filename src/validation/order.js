import Joi from 'joi';

export const orderSchema = Joi.object({
  name: Joi.string().trim().min(3).max(16).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().trim().lowercase().max(128).email().required().messages({
    'string.max': 'Email should have at most {#limit} characters',
    'string.email': 'Email should be valid',
    'any.required': 'Email is required',
  }),
  BookingStartDate: Joi.date().iso().min('now').optional().allow(null).messages({
    'date.base': 'Date must be a valid date',
    'date.min': 'Date cannot be in the past',
  }),
    BookingEndDate: Joi.date().iso().greater(Joi.ref('BookingStartDate')).optional().allow(null).messages({
    'date.base': 'Date must be a valid date',
    'date.min': 'Date cannot be in the past',
    'greater': 'End date must be after start date',
  }),
  comment: Joi.string().allow('').optional(),
  carId: Joi.string().required().messages({
    'any.required': 'Car ID is required',
  }),
});

export const orderConfirmSchema = Joi.object({
  confirm: Joi.string().required().messages({
    'string.base': 'Confirm must be a string',
    'any.required': 'Confirm is required',
  }),
  token: Joi.string().required().messages({
    'string.base': 'Token must be a string',
    'string.empty': 'Token is required',
    'any.required': 'Token is required',
  }),
});
