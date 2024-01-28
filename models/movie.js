import mongoose from 'mongoose';
import { UrlRegEx } from '../utils/UrlRegEx';

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: {
        value: true,
        message: 'Поле страна является обязательным',
      },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    director: {
      type: String,
      required: {
        value: true,
        message: 'Поле режиссёр является обязательным',
      },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    duration: {
      type: Number,
      required: {
        value: true,
        message: 'Поле длительность фильма является обязательным',
      },
    },
    year: {
      type: String,
      required: {
        value: true,
        message: 'Поле год выпуска является обязательным',
      },
    },
    description: {
      type: String,
      required: {
        value: true,
        message: 'Поле описание фильма является обязательным',
      },
      minlength: [2, 'Минимальная длина 2 символа'],
    },
    image: {
      type: String,
      required: {
        value: true,
        message: 'Здесь должна быть ссылка',
      },
      validate: {
        validator: (v) => UrlRegEx.test(v),
        message: 'Дана некорректная ссылка',
      },
    },
    trailerLink: {
      type: String,
      required: {
        value: true,
        message: 'Здесь должна быть ссылка',
      },
      validate: {
        validator: (v) => UrlRegEx.test(v),
        message: 'Дана некорректная ссылка',
      },
    },
    thumbnail: {
      type: String,
      required: {
        value: true,
        message: 'Здесь должна быть ссылка',
      },
      validate: {
        validator: (v) => UrlRegEx.test(v),
        message: 'Дана некорректная ссылка',
      },
    },
    // _id пользователя, который сохранил фильм
    owner: {
      // ссылка на модель пользователя
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // id фильма, который содержится в ответе сервиса MoviesExplorer
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: {
        value: true,
        message: 'Поле название фильма является обязательным',
      },
    },
    nameEN: {
      type: String,
      required: {
        value: true,
        message: 'Поле название фильма является обязательным',
      },
    },
  },
  { versionKey: false, timestamps: true },
);

// создаём модель и экспортируем её
export default mongoose.model('movie', movieSchema);
