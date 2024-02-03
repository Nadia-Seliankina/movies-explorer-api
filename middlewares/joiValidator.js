import { celebrate, Joi } from 'celebrate';
import UrlRegEx from '../utils/UrlRegEx';

export const joiAddMovieValidator = (req, res, next) => {
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
};

export const joiDeleteMovieValidator = (req, res, next) => {
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      BDmovieId: Joi.string().alphanum().length(24).hex(),
    }).unknown(true),
  });

  next();
};

export const joiGetUserIdValidator = (req, res, next) => {
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).hex(),
    }).unknown(true),
  });

  next();
};

export const joiHeadersValidator = (req, res, next) => {
  celebrate({
    // валидируем заголовки
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(true),
  });

  next();
};

export const joiSigninValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }).unknown(true),
  });

  next();
};

export const joiSignupValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30).required(),
    }).unknown(true),
  });

  next();
};

export const joiUpdateUserValidator = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }).unknown(true),
  });

  next();
};
