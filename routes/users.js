import { Router } from 'express';
/* eslint import/extensions: "off" */
import {
  getUserActive, updateUserProfile,
} from '../controllers/users.js';
import { joiUpdateUserValidator } from '../middlewares/joiValidator.js';

const userRouter = Router(); // создали роутер

userRouter.get('/me', getUserActive);

userRouter.patch('/me', joiUpdateUserValidator, updateUserProfile);

export default userRouter; // экспортировали роутер
