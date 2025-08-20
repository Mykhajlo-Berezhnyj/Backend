import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      createHttpError(400, "Bad request", {
        data: {
          message: "Please provide contact details before submitting",
          errors: ["No fields were provided"],
        },
      })
    );
  }
  try {
    const validated = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body = validated;
    next();
  } catch (err) {
    const messages = err.details?.map((detail) => detail.message);
    next(
      createHttpError(400, "Bad request", {
        data: {
          message: "Validation failed",
          errors: messages,
        },
      })
    );
  }
};
