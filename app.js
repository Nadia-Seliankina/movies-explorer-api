// Здесь функциональность точки входа

import express, { json, urlencoded } from 'express'; // подключаем express
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'; // подключать над роутерами!
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

/* eslint import/extensions: "off" */
import router from './routes/index.js'; // импортируем роутер
import handleErrors from './middlewares/handleErrors.js';
import limiter from './middlewares/limiter.js';
import { URLconf } from './config.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

dotenv.config(); // подключение переменных окружения

// const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { PORT = 3001 } = process.env;

const app = express(); // создаём приложение методом express

// подключаемся к серверу mongo
// mongoose.connect(MONGO_URL);
mongoose.connect(URLconf);

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

// чтобы не было ошибок когда с фронта тестировать бэк.
app.use(
  cors({
    origin: [
      'https://movie.seliankina.nomoredomainswork.ru',
      'http://movie.seliankina.nomoredomainswork.ru',
      'http://localhost:3000',
    ],
    credentials: true,
    maxAge: 3600000 * 24 * 7,
  }),
);

// подключаем rate-limiter
app.use(limiter);

// в объекте req. появится поле куки,
// чтобы считывать куки кот. прилетают с браузера клиента
app.use(cookieParser());

app.use(helmet()); // заголовки безопасности проставляются автоматически

// мидлвар для получения body (синхронная операция обработка body на сервере)
// Обогащает объект req.body
app.use(json());

// данные в полученном объекте body могут быть любых типов
app.use(urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// Ситуации, в которых сервер падает, должны быть предусмотрены.
// Приложение должно работать в процессе, который в случае падения автоматически восстанавливается
// Не забудьте удалить этот код после успешного прохождения ревью.
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
console.log('crash-test');

app.use(router); // запускаем router

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleErrors); // централизованная обработка ошибок

// будем принимать сообщения с PORT
/* eslint no-console: "off" */
app.listen(PORT, (err) => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
  if (err) console.log(err);
});
