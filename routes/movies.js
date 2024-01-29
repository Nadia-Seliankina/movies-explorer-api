import { Router } from 'express';
/* eslint import/extensions: "off" */
import { createMovie, deleteMovie, getMovies } from '../controllers/movie.js';

const movieRouter = Router(); // создали роутер

// возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

// создаёт фильм
movieRouter.post('/', createMovie);

// удаляет сохранённый фильм по id
// DELETE /movies/_id
movieRouter.delete('/:movieId', deleteMovie);

export default movieRouter; // экспортировали роутер
