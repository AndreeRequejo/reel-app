// movie.mapper.ts
import { Movie } from '../interfaces/movie.interface';

export function mapToMovie(raw: any): Movie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    poster_path: raw.poster_path ?? null,
    backdrop_path: raw.backdrop_path ?? null,
    release_date: raw.release_date,
    vote_average: raw.vote_average,
    vote_count: raw.vote_count,
    genre_ids: raw.genre_ids ?? [],
    popularity: raw.popularity,
  };
}
