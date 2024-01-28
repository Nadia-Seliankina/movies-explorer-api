// точка входа роутинга
import { Router } from 'express';
import userRouter from './users';

const router = Router(); // создали роутер

router.use('/users', userRouter);

// При запросах по несуществующим маршрутам
//router.use('*', auth, (req, res, next) => {
  //next(new NotFoundError('404. Страница не найдена.'));
//});

export default router; // экспортировали роутер
