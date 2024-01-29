import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: {
        value: true,
        message: 'Поле email является обязательным',
      },
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: 'Поле пароль является обязательным',
      },
      // при поиске сущности не будет включаться в результат поиска, не светить пароль
      select: false,
    },
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле имя является обязательным',
      },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    //likes: [
      //{
        // список понравившихся фильмов
        // описываем схему для одного элемента
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'movie',
        //required: true,
        //default: [],
      //},
    //],
  },
  { versionKey: false, timestamps: true },
);

// создаём модель и экспортируем её
export default mongoose.model('user', userSchema);
