// Здесь функциональность точки входа

import express from 'express'; // подключаем express
import mongoose from 'mongoose';
import router from './routes/index';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env; // Слушаем 3000 порт

const app = express(); // создаём приложение методом express

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

// мидлвэр
// router.get('/', (req, res, next) => {
// next();
// });

// роутинг
app.use(router); // запускаем router

// будем принимать сообщения с PORT
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
