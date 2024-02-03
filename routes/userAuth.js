import { Router } from 'express';
/* eslint import/extensions: "off" */
import {
  createUser, deleteJWT, login,
} from '../controllers/users.js';
import { joiSigninValidator, joiSignupValidator } from '../middlewares/joiValidator.js';

const authRouter = Router(); // создали роутер

authRouter.post('/signup', joiSignupValidator, createUser);

authRouter.post('/signin', joiSigninValidator, login);

// удалится JWT из куков пользователя
authRouter.delete('/signout', deleteJWT);

export default authRouter; // экспортировали роутер
