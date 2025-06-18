import Joi from "joi";

export const validateRequest = (schema) => {
  return (request, response, next) => {
    const { error } = schema.validate(
      request.method === "GET" ? request.query : request.body,
      {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
      }
    );

    if (error) {
      return response.status(400).json({
        error,
        message: "Ошибка валидации!",
      });
    }

    next();
  };
};

export const meteorsGetSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}$/)
    .message("Date format should be YYYY-MM-DD_YYYY-MM-DD"),
  count: Joi.boolean().default(false),
  were_dangerous_meteors: Joi.boolean().default(false),
});

export const meteorsPostSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
