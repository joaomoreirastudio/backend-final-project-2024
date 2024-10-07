import { Request, Response, NextFunction } from 'express';
import MovieService from '../services/movieService.js';
import movieService from '../services/movieService.js';
import IMovie from '../interfaces/movieInterface.js';
import fileService from '../utils/fileService.js';

export class MovieController {
  async getAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await MovieService.getAll();
      res.json(movies);
    } catch (error: unknown) {
      next(error);
    }
  }

  async createNewMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, releaseDate, trailerLink, genres } = req.body;
      const posterUrl = req.files?.posterUrl;

      if (!posterUrl) {
        return res.status(400).json({ message: 'Poster file is required' });
      }

      const posterFileName = fileService.save(posterUrl);

      const movieData = {
        title,
        releaseDate,
        trailerLink,
        genres,
        posterUrl: `/static/${posterFileName}`,
      } as unknown as IMovie;

      const createdMovie = await movieService.create(movieData, posterUrl);

      res.status(201).json(createdMovie);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Error creating movie', err.message);
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.update(req.params.id, req.body);
      res.json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    try {
      await MovieService.delete(req.params.id);
      res.json({ message: 'Movie deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }
  async getMovieFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MovieService.searchMovies(req.query);
      res.json(result);
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new MovieController();
export const getAllMovies = new MovieController().getAllMovies;
export const createNewMovie = new MovieController().createNewMovie;
export const updateMovie = new MovieController().updateMovie;
export const deleteMovie = new MovieController().deleteMovie;
export const getMovieFilter = new MovieController().getMovieFilter;
