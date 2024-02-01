import { Router } from 'express';
/* eslint import/extensions: "off" */
import { createMovie, deleteMovie, getMovies } from '../controllers/movie.js';
import joiAddMovieValidator from '../middlewares/joiAddMovieValidator.js';
import joiDeleteMovieValidator from '../middlewares/joiDeleteMovieValidator.js';

const movieRouter = Router(); // создали роутер

// возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

movieRouter.post('/', joiAddMovieValidator, createMovie);

movieRouter.delete('/:BDmovieId', joiDeleteMovieValidator, deleteMovie);

export default movieRouter; // экспортировали роутер
