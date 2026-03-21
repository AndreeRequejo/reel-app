import { Injectable } from '@nestjs/common';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  searchMovies,
  searchMoviesById,
  getGenresMovies,
  discoverByGenreMovies,
  getMovieDetail,
} from './lib/tmdb.lib';
import {
  Genre,
  Movie,
  MovieDetail,
  MovieResponse,
} from './interfaces/movie.interface';
import {
  mapToMovieResponse,
  mapToMovieDetail,
  mapSearchMovie,
} from './mappers/movie.mapper';

@Injectable()
export class MoviesService {
  async getDetail(id: string): Promise<MovieDetail> {
    const response = await getMovieDetail(id);
    return mapToMovieDetail(response);
  }

  async getTrending(page: number = 1): Promise<MovieResponse> {
    const response = await getTrendingMovies(page);
    return mapToMovieResponse(response);
  }

  async getPopular(page: number = 1): Promise<MovieResponse> {
    const response = await getPopularMovies(page);
    return mapToMovieResponse(response);
  }

  async getTopRated(page: number = 1): Promise<MovieResponse> {
    const response = await getTopRatedMovies(page);
    return mapToMovieResponse(response);
  }

  async getNowPlaying(page: number = 1): Promise<MovieResponse> {
    const response = await getNowPlayingMovies(page);
    return mapToMovieResponse(response);
  }

  async getUpcoming(page: number = 1): Promise<MovieResponse> {
    const response = await getUpcomingMovies(page);
    return mapToMovieResponse(response);
  }

  async search(query: string, page: number = 1): Promise<MovieResponse> {
    const response = await searchMovies(query, page);
    return mapToMovieResponse(response);
  }

  async getById(id: string): Promise<Movie> {
    const response = await searchMoviesById(id);
    return mapSearchMovie(response);
  }

  async getGenres(): Promise<{ genres: Genre[] }> {
    return getGenresMovies();
  }

  async discoverByGenre(
    genreId: string,
    page: number = 1,
  ): Promise<MovieResponse> {
    const response = await discoverByGenreMovies(genreId, page);
    return mapToMovieResponse(response);
  }
}
