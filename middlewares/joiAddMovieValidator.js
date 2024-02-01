import { celebrate, Joi } from 'celebrate';
import { UrlRegEx } from '../utils/UrlRegEx';

export default function (req, res, next) {
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required().min(2),
      image: Joi.string().required().pattern(UrlRegEx),
      trailerLink: Joi.string().required().pattern(UrlRegEx),
      thumbnail: Joi.string().required().pattern(UrlRegEx),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }).unknown(true),
  });

  next();
}
