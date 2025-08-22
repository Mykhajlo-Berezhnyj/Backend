import Joi from 'joi';

export const createAddOwnRecipeSchema = Joi.object({
    area: Joi.string().required(),
    title: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).required(),
    time: Joi.number().required(),
    calories: Joi.number().optional(),
    category: Joi.string().required(),
    ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string().min(1).required(),
      measure: Joi.string().required(),
    })
  ),
    instructions: Joi.string().required(),
    thumb: Joi.string()
});