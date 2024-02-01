import { Router } from 'express';
/* eslint import/extensions: "off" */
import {
  createUser, deleteJWT, login,
} from '../controllers/users.js';
import joiSignupValidator from '../middlewares/joiSignupValidator.js';
import joiSigninValidator from '../middlewares/joiSigninValidator.js';

const authRouter = Router(); // создали роутер

authRouter.post('/signup', joiSignupValidator, createUser);

authRouter.post('/signin', joiSigninValidator, login);

// удалится JWT из куков пользователя
authRouter.delete('/signout', deleteJWT);

export default authRouter; // экспортировали роутер
