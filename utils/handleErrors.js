// здесь обрабатываем все ошибки
import { constants } from 'http2';
/* eslint import/extensions: "off" */
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

const MONGO_DUBLICATE_ERROR_CODE = 11000;

/* eslint consistent-return: ["off", { "treatUndefinedAsUnspecified": true }] */
/* eslint no-unused-vars: "off" */
export default function handleErrors(err, req, res, next) {
  if (err.name === 'MongoServerError') {
    return err.code === MONGO_DUBLICATE_ERROR_CODE
      ? res
        .status(constants.HTTP_STATUS_CONFLICT)
        .send({
          message: 'Пользователь с таким email уже существует',
          error: err.message,
        })
      : res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка соединения с базой данных' });
  }

  if (err instanceof NotFoundError || err instanceof UnauthorizedError
    || err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).send({
      message: err.message,
      error: err.message,
    });
  }

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
      error: err.message,
    });
  }

  //if (err.name === 'JsonWebTokenError') {
    //return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send({ message: 'С токеном что-то не так' });
  //}

  res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
    message: 'Ошибка на стороне сервера',
    // error: error.message
    // не показывать, чтобы не помогать злоумышленникам
  });
}

// чтобы посмотреть все константы ошибок:
// console.log(Object.fromEntries(
// Object.entries(constants)
// .filter(([key]) => key.startsWith('HTTP_STATUS_')),
// ));
