import { celebrate, Joi } from 'celebrate';
/* eslint import/extensions: "off" */
import UrlRegEx from '../utils/UrlRegEx.js';

export const joiAddMovieValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(UrlRegEx),
      trailerLink: Joi.string().required().pattern(UrlRegEx),
      thumbnail: Joi.string().required().pattern(UrlRegEx),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  });

  next();
};

export const joiDeleteMovieValidator = (req, res, next) => {
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      BDmovieId: Joi.string().alphanum().length(24).hex(),
    }),
  });

  next();
};

export const joiSigninValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });

  next();
};

export const joiSignupValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30).required(),
    }),
  });

  next();
};

export const joiUpdateUserValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
  });

  next();
};
