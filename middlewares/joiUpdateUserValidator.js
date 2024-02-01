import { celebrate, Joi } from 'celebrate';

export default function (req, res, next) {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  });

  next();
}
