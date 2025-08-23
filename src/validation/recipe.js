import Joi from "joi";

export const createAddOwnRecipeSchema = Joi.object({
  area: Joi.string().required(),
  title: Joi.string().max(64).required(),
  description: Joi.string().max(200).required(),
  time: Joi.number().min(1).max(360).required(),
  calories: Joi.number().min(1).max(10000).optional(),
  category: Joi.string()
    // .valid(
    //   "Seafood",
    //   "Lamb",
    //   "Starter",
    //   "Chicken",
    //   "Beef",
    //   "Dessert",
    //   "Vegan",
    //   "Pork",
    //   "Vegetarian",
    //   "Miscellaneous",
    //   "Pasta",
    //   "Breakfast",
    //   "Side",
    //   "Goat",
    //   "Soup"
    // )
    .required(),
  //   ingredients: Joi.array()
  //     .items(
  //       Joi.object({
  //         id: Joi.string().required(),
  //         measure: Joi.string().min(2).max(16).required(),
  //       })
  //     ).min(1)
  //     .required(),
  ingredients: Joi.alternatives()
    .try(
      Joi.array().items(
        Joi.object({
          id: Joi.string().min(1).required(),
          measure: Joi.string().min(2).max(16).required(),
        })
      ),
      Joi.string().custom((value, helpers) => {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) {
            return helpers.error("any.invalid");
          }
          return parsed;
        } catch (err) {
          return helpers.error("any.invalid");
        }
      }, "Parse ingredients JSON")
    )
    .required(),
  instructions: Joi.string().max(1200).required(),
  thumb: Joi.string().uri().optional(),
});
