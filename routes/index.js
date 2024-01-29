// точка входа роутинга
import { Router } from 'express';
/* eslint import/extensions: "off" */
import userRouter from './users.js';
import movieRouter from './movies.js';

const router = Router(); // создали роутер

router.use('/users', userRouter);
router.use('/movies', movieRouter);

// При запросах по несуществующим маршрутам
// router.use('*', auth, (req, res, next) => {
// next(new NotFoundError('404. Страница не найдена.'));
// });

export default router; // экспортировали роутер
