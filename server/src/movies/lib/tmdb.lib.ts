import { BASE_URL, DEFAULT_LANGUAGE } from '../const/tmdb.const';
import { Movie, MovieResponse } from '../interfaces/movie.interface';

function getTmdbApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('Falta TMDB_API_KEY en variables de entorno');
  }
  console.log(apiKey);
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

export const getTrendingMovies = (page = 1): Promise<MovieResponse<Movie>> =>
  fetchTMDb('/trending/movie/week', { page: String(page) });
