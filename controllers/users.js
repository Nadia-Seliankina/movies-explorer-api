import { constants } from 'http2';
import bcrypt from 'bcrypt';
/* eslint import/extensions: "off" */
import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import ConflictError from '../errors/ConflictError.js';
import generateToken from '../utils/jwt.js';
import { dublicateUserMessage, noUserMessage, unauthorizedMessage } from '../utils/constants.js';

const SALT_ROUNDS = 10;
const MONGO_DUBLICATE_ERROR_CODE = 11000;

/* eslint consistent-return: "off" */
export const getUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError(noUserMessage),
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
      () => new NotFoundError(noUserMessage),
    );

    return res.status(constants.HTTP_STATUS_OK).send({
      name: userProfile.name,
      email: userProfile.email,
    });
  } catch (error) {
    if (error.code === MONGO_DUBLICATE_ERROR_CODE) {
      next(new ConflictError(dublicateUserMessage));
    }

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

    const token = generateToken({ _id: newUser._id });

    return res.status(constants.HTTP_STATUS_OK).send({
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    if (error.code === MONGO_DUBLICATE_ERROR_CODE) {
      next(new ConflictError(dublicateUserMessage));
    }

    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // поискать пользователя с полученной почтой в базе
    const userLogin = await User.findOne({ email })
      .select('+password')
      .orFail(() => new UnauthorizedError(unauthorizedMessage));
    // сравниваем переданный пароль и хеш из базы
    const matched = await bcrypt.compare(password, userLogin.password);
    // хеши не совпали — отклоняем промис
    if (!matched) {
      throw new UnauthorizedError(unauthorizedMessage);
    }

    // аутентификация успешна
    const token = generateToken({ _id: userLogin._id });

    // записываем JWT в httpOnly куку.
    // res.cookie('bitfilmsToken', token, {
    // maxAge: 3600000 * 24 * 7, // такая кука будет храниться 7 дней
    // httpOnly: true, // когда кука отправится с бека, не будет считываться с JS c document cookie
    // //simeSite: true, // браузер посылает куки, только если запрос сделан с того же домена
    // });

    return res.status(constants.HTTP_STATUS_OK).send({ token });
    // return res.status(constants.HTTP_STATUS_OK).send({ _id: userLogin._id });
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
