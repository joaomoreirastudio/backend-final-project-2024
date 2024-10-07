import mongoose from 'mongoose';
import Movie from '../models/movieModel.js';
import IMovie from '../interfaces/movieInterface.js';
import fileService from '../utils/fileService.js';
import MovieModel from '../models/movieModel.js';

class MovieService {
  async getAll() {
    return await Movie.find();
  }

  async getOne(id: string) {
    return await Movie.findById(id);
  }

  async create(movieData: IMovie, poster: unknown) {
    try {
      if (poster) {
        const posterUrl = fileService.save(poster);
        movieData.posterUrl = posterUrl;
      }
      const newMovie = new MovieModel(movieData);
      return await newMovie.save();
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, movieData: Partial<IMovie>) {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
  }

  async delete(id: string) {
    return await Movie.findByIdAndDelete(id);
  }

  async searchMovies(query: any) {
    const { page = 1, limit = 10, sortBy = 'releaseDate', order = 'asc', search = '', genre = '' } = query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { releaseDate: new RegExp(search, 'i') },
        { genres: new RegExp(search, 'i') },
      ];
    }
    if (genre) {
      filter.genres = genre;
    }

    const sort: { [key: string]: 'asc' | 'desc' } = { [sortBy]: order === 'asc' ? 'asc' : 'desc' };

    const movies = await Movie.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Movie.countDocuments(filter);

    return { movies, total, page, pages: Math.ceil(total / limit) };
  }
}

export default new MovieService();
