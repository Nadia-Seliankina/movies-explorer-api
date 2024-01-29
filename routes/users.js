import { Router } from 'express';
/* eslint import/extensions: "off" */
import {
  createUser, getUserActive, getUserById, getUsers, updateUserProfile,
} from '../controllers/users.js';

const userRouter = Router(); // создали роутер

userRouter.get('/me', getUserActive);
userRouter.patch('/me', updateUserProfile);
userRouter.post('/', createUser);

// дополнительный функционал
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);

export default userRouter; // экспортировали роутер
