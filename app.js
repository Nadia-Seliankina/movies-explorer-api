// Здесь функциональность точки входа

import express, { json } from 'express'; // подключаем express
import mongoose from 'mongoose';
/* eslint import/extensions: "off" */
import router from './routes/index.js';
import handleErrors from './utils/handleErrors.js';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env; // Слушаем 3000 порт

const app = express(); // создаём приложение методом express

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

// мидлвэры

// мидлвар для получения body (синхронная операция обработка body на сервере)
// Обогащает объект req.body
app.use(json());

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '65b7dfb3ae3e2f6ecbb42e40',
  };

  next();
});

// роутинг
app.use(router); // запускаем router

// Централизованная обработка ошибок
app.use(handleErrors);

// будем принимать сообщения с PORT
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
