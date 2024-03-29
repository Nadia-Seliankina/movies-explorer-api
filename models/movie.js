import mongoose from 'mongoose';
/* eslint import/extensions: 'off' */
import UrlRegEx from '../utils/UrlRegEx.js';
import {
  URLerror,
  countryRequired,
  descriptionRequired,
  directorRequired,
  durationRequired,
  linkRequired,
  nameRequired,
  yearRequired,
} from '../utils/constants.js';

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: {
        value: true,
        message: countryRequired,
      },
    },
    director: {
      type: String,
      required: {
        value: true,
        message: directorRequired,
      },
    },
    duration: {
      type: Number,
      required: {
        value: true,
        message: durationRequired,
      },
    },
    year: {
      type: String,
      required: {
        value: true,
        message: yearRequired,
      },
    },
    description: {
      type: String,
      required: {
        value: true,
        message: descriptionRequired,
      },
    },
    image: {
      type: String,
      required: {
        value: true,
        message: linkRequired,
      },
      validate: {
        validator: (v) => UrlRegEx.test(v),
        message: URLerror,
      },
    },
    trailerLink: {
      type: String,
      required: {
        value: true,
        message: linkRequired,
      },
      validate: {
        validator: (v) => UrlRegEx.test(v),
        message: URLerror,
      },
    },
    thumbnail: {
      type: String,
      required: {
        value: true,
        message: linkRequired,
      },
      validate: {
        validator: (v) => UrlRegEx.test(v),
        message: URLerror,
      },
    },
    owner: {
      // _id пользователя, который сохранил фильм
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
        message: nameRequired,
      },
    },
    nameEN: {
      type: String,
      required: {
        value: true,
        message: nameRequired,
      },
    },
  },
  { versionKey: false, timestamps: true },
);

// создаём модель и экспортируем её
export default mongoose.model('movie', movieSchema);
