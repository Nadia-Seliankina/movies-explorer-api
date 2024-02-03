// точка входа роутинга
import { Router } from 'express';
// import path from 'path';
/* eslint import/extensions: "off" */
import userRouter from './users.js';
import movieRouter from './movies.js';
import authRouter from './userAuth.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';
import { joiHeadersValidator } from '../middlewares/joiValidator.js';

// const public_folder = path.join(__dirname, 'public');
// const index_file = path.join(public_folder, 'index.html');

const router = Router(); // создали роутер

router.use('/', authRouter);

// Защита авторизацией всех маршрутов
router.use('/users', auth, joiHeadersValidator, userRouter);

router.use('/movies', auth, joiHeadersValidator, movieRouter);

// При запросах по несуществующим маршрутам
router.use('*', auth, (req, res, next) => {
  // res.sendFile(index_file);
  next(new NotFoundError('404. Страница не найдена.'));
});

export default router; // экспортировали роутер
