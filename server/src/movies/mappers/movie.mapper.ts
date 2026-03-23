import { getBackdropUrl, getImageUrl } from './../const/tmdb.const';

import {
  Movie,
  MovieDetail,
  MovieResponse,
} from '../interfaces/movie.interface';
import { Result, TmdbResponse } from '../interfaces/tmdb.interface';
import { TmdbDetailResponse } from '../interfaces/tmdb-detail.interface';

export function mapToMovie(raw: Result): Movie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    poster_path: getImageUrl(raw.poster_path) ?? null,
    backdrop_path: getBackdropUrl(raw.backdrop_path) ?? null,
    release_date: String(raw.release_date),
    vote_average: raw.vote_average,
  };
}

export function mapToMovieResponse(raw: TmdbResponse): MovieResponse {
  return {
    page: raw.page,
    total_pages: raw.total_pages,
    total_results: raw.total_results,
    results: raw.results.map(mapToMovie),
  };
}

export function mapSearchMovie(raw: TmdbDetailResponse): Movie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    poster_path: getImageUrl(raw.poster_path) ?? null,
    backdrop_path: getBackdropUrl(raw.backdrop_path) ?? null,
    release_date: String(raw.release_date),
    vote_average: raw.vote_average,
  };
}

export function mapToMovieDetail(raw: TmdbDetailResponse): MovieDetail {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    poster_path: getImageUrl(raw.poster_path) ?? null,
    backdrop_path: getBackdropUrl(raw.backdrop_path) ?? null,
    release_date: String(raw.release_date),
    vote_average: raw.vote_average,
    genres: raw.genres ?? [],
    status: raw.status,
    credits: raw.credits
      ? {
          cast: (raw.credits.cast ?? []).map((c) => ({
            id: c.id,
            name: c.name,
            character: c.character,
            profile_path: getImageUrl(c.profile_path) ?? null,
          })),
          crew: (raw.credits.crew ?? []).map((c) => ({
            id: c.id,
            name: c.name,
            job: c.job,
            profile_path: getImageUrl(c.profile_path) ?? null,
          })),
        }
      : undefined,
    videos: raw.videos ? { results: raw.videos.results ?? [] } : undefined,
  };
}
