import { Router } from 'express';
/* eslint import/extensions: "off" */
import {
  getUserActive, getUserById, getUsers, updateUserProfile,
} from '../controllers/users.js';
import { joiGetUserIdValidator, joiUpdateUserValidator } from '../middlewares/joiValidator.js';

const userRouter = Router(); // создали роутер

userRouter.get('/me', getUserActive);

userRouter.patch('/me', joiUpdateUserValidator, updateUserProfile);

// дополнительный функционал
userRouter.get('/', getUsers);

userRouter.get('/:userId', joiGetUserIdValidator, getUserById);

export default userRouter; // экспортировали роутер
