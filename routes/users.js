import { Router } from 'express';
import { getUserActive, updateUserProfile } from '../controllers/users';

const userRouter = Router(); // создали роутер

userRouter.get('/me', getUserActive);
userRouter.patch('/me', updateUserProfile);

export default userRouter; // экспортировали роутер
