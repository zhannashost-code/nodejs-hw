import { celebrate, Joi, Segments } from 'celebrate';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object({
      username: Joi.string().min(3),
      email: Joi.string().pattern(emailRegex).required(),
      password: Joi.string().min(8).required(),
    }),
  },
  { abortEarly: false },
);

export const loginUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object({
      email: Joi.string().pattern(emailRegex).required(),
      password: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);
