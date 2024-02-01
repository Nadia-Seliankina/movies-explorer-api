import { celebrate, Joi } from 'celebrate';

export default function (req, res, next) {
  celebrate({
    // валидируем заголовки
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
  });

  next();
}
