import { celebrate, Joi } from 'celebrate';

export default function (req, res, next) {
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).hex(),
    }).unknown(true),
  });

  next();
}
