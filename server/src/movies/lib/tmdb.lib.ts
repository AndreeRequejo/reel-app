import { BASE_URL, DEFAULT_LANGUAGE } from '../const/tmdb.const';
import { Genre } from '../interfaces/movie.interface';
import { TmdbResponse } from '../interfaces/tmdb.interface';

function getTmdbApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('Falta TMDB_API_KEY en variables de entorno');
  }
  return apiKey;
}

export async function fetchTMDb<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const apiKey = getTmdbApiKey();

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', DEFAULT_LANGUAGE);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDb Error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export const getTrendingMovies = (page = 1): Promise<TmdbResponse> =>
  fetchTMDb('/trending/movie/week', { page: String(page) });

export const getPopularMovies = (page = 1): Promise<TmdbResponse> =>
  fetchTMDb('/movie/popular', { page: String(page) });

export const getTopRatedMovies = (page = 1): Promise<TmdbResponse> =>
  fetchTMDb('/movie/top_rated', { page: String(page) });

export const getNowPlayingMovies = (page = 1): Promise<TmdbResponse> =>
  fetchTMDb('/movie/now_playing', { page: String(page) });

export const getUpcomingMovies = (page = 1): Promise<TmdbResponse> =>
  fetchTMDb('/movie/upcoming', { page: String(page) });

export const searchMovies = (query: string, page = 1): Promise<TmdbResponse> =>
  fetchTMDb('/search/movie', { query, page: String(page) });

export const searchMoviesById = (id: string) => fetchTMDb(`/movie/${id}`);

export const getGenresMovies = (): Promise<{ genres: Genre[] }> =>
  fetchTMDb('/genre/movie/list');

export const discoverByGenreMovies = (
  genreId: string,
  page = 1,
): Promise<TmdbResponse> =>
  fetchTMDb('/discover/movie', {
    with_genres: String(genreId),
    page: String(page),
  });
