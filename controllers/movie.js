import { constants } from 'http2';
/* eslint import/extensions: "off" */
import Movie from '../models/Movie.js';
import NotFoundError from '../errors/NotFoundError.js';

/* eslint consistent-return: "off" */
export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send(movies);
  } catch (error) {
    next(error);
  }
};

// создаёт фильм с переданными в теле...
export const createMovie = async (req, res, next) => {
  try {
    // мидлвэр auth добавляет в каждый запрос объект user.
    const ownerId = req.user._id;

    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: ownerId,
    });

    return res.status(constants.HTTP_STATUS_CREATED).send(newMovie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).orFail(() => new NotFoundError('Карточка по указанному _id не найдена'));

    await Movie.deleteOne(movie);

    return res.send(movie);
  } catch (error) {
    next(error);
  }
};
