// перехватывает запросы к пользователю
import jwt from 'jsonwebtoken';
/* eslint import/extensions: "off" */
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { JWTconf } from '../config.js';
import { unauthorizedMessage } from '../utils/constants.js';

export default function aufh(req, res, next) {
  let payload;
  try {
    // достаём авторизационный заголовок
    // const token = req.headers.authorization;
    const token = req.cookies.bitfilmsToken;

    // проверка токена
    if (!token) {
      throw new UnauthorizedError(unauthorizedMessage);
    }
    // извлечём токен. Таким образом, в переменную token запишется только JWT
    const validToken = token.replace('Bearer ', '');
    // верифицируем токен
    payload = jwt.verify(validToken, JWTconf);
  } catch (error) {
    next(error);
  }

  // обогатить объект req, запишем payload из токена в объект запроса
  req.user = payload;

  next();
}
