import { constants } from 'http2';
import bcrypt from 'bcrypt';
/* eslint import/extensions: "off" */
import User from '../models/User.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import generateToken from '../utils/jwt.js';
// import ForbiddenError from '../errors/ForbiddenError.js';

// добавить в Env
const SALT_ROUNDS = 10;

/* eslint consistent-return: "off" */
export const getUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError('Пользователь по указанному _id не найден'),
    );

    return res.status(constants.HTTP_STATUS_OK).send({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    // const { idUser } = req.params;
    const activUserId = req.user._id;
    const { name, email } = req.body; // получим из объекта запроса имя и описание пользователя
    const userProfile = await User.findByIdAndUpdate(
      activUserId,
      { name, email },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true,
        // данные будут валидированы перед изменением
      },
    ).orFail(
      () => new NotFoundError('Пользователь по указанному _id не найден'),
    );

    // if (activUserId !== idUser) {
    // throw new ForbiddenError('Доступ на изменения запрещён');
    // }

    return res.status(constants.HTTP_STATUS_OK).send({
      name: userProfile.name,
      email: userProfile.email,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    // хешируем пароль
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({ name, email, password: hash }); // записываем хеш в базу

    return res.status(constants.HTTP_STATUS_OK).send({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // поискать пользователя с полученной почтой в базе
    const userLogin = await User.findOne({ email })
      .select('+password')
      .orFail(() => new UnauthorizedError('Неправильные почта или пароль'));
    // сравниваем переданный пароль и хеш из базы
    const matched = await bcrypt.compare(password, userLogin.password);
    // хеши не совпали — отклоняем промис
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    // аутентификация успешна
    const token = generateToken({ _id: userLogin._id });

    // записываем JWT в httpOnly куку.
    res.cookie('bitfilmsToken', token, {
      // maxAge: 86400000, // 1дн в миллисекундах
      expires: new Date(Date.now() + 24 * 3600000), // cookie will be removed after 24 hours
      httpOnly: true, // когда кука отправится с бека, не будет считываться с JS c document cookie
      simeSite: true,
    });

    // return res.status(constants.HTTP_STATUS_OK).send({ token });
    return res.status(constants.HTTP_STATUS_OK).send({ _id: userLogin._id });
  } catch (error) {
    next(error);
  }
};

export const deleteJWT = (req, res, next) => {
  try {
    res.clearCookie('bitfilmsToken').send('cookie cleared');
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
