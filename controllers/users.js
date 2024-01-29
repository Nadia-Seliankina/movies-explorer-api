import { constants } from 'http2';
/* eslint import/extensions: "off" */
import User from '../models/User.js';
import NotFoundError from '../errors/NotFoundError.js';

/* eslint consistent-return: "off" */
export const getUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError('Пользователь по указанному _id не найден'),
    );

    return res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body; // получим из объекта запроса имя и описание пользователя
    const userProfile = await User.findByIdAndUpdate(
      userId,
      { name, email },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true,
        // данные будут валидированы перед изменением
      },
    ).orFail(
      () => new NotFoundError('Пользователь по указанному _id не найден'),
    );

    return res.status(constants.HTTP_STATUS_OK).send(userProfile);
  } catch (error) {
    next(error);
  }
};

// временное решение до реализации авторизации и регистрации
export const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const newUser = await User.create({ name, email, password });

    return res.status(constants.HTTP_STATUS_OK).send({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

// дополнительный функционал
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(constants.HTTP_STATUS_OK).send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => new NotFoundError('Пользователь по указанному _id не найден'),
    );

    return res.status(constants.HTTP_STATUS_OK).send(user);
  } catch (error) {
    next(error);
  }
};
