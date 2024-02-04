import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
/* eslint import/extensions: 'off' */
import {
  emailError,
  emailRequired,
  maxlength30,
  minlength2,
  minlength8,
  nameUserRequired,
  passwordRequired,
} from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: {
        value: true,
        message: emailRequired,
      },
      validate: {
        validator: (v) => isEmail(v),
        message: emailError,
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: passwordRequired,
      },
      minlength: [8, minlength8],
      // при поиске сущности не будет включаться в результат поиска, не светить пароль
      select: false,
    },
    name: {
      type: String,
      required: {
        value: true,
        message: nameUserRequired,
      },
      minlength: [2, minlength2],
      maxlength: [30, maxlength30],
    },
  },
  { versionKey: false, timestamps: true },
);

// создаём модель и экспортируем её
export default mongoose.model('user', userSchema);
