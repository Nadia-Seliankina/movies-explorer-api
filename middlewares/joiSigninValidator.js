import { celebrate, Joi } from 'celebrate';

export default function (req, res, next) {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }).unknown(true),
  });

  next();
}
