import { Router } from 'express';
/* eslint import/extensions: "off" */
import { createMovie, deleteMovie, getMovies } from '../controllers/movie.js';
import { joiAddMovieValidator, joiDeleteMovieValidator } from '../middlewares/joiValidator.js';

const movieRouter = Router(); // создали роутер

// возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

movieRouter.post('/', joiAddMovieValidator, createMovie);

movieRouter.delete('/:BDmovieId', joiDeleteMovieValidator, deleteMovie);

export default movieRouter; // экспортировали роутер
