"use server";

import type { Movie } from "@/interfaces/movie";

export type MovieType =
  | "trending"
  | "popular"
  | "top-rated"
  | "now-playing"
  | "upcoming";

interface MoviesResponse {
  results: Movie[];
}

export async function getMoviesByType(type: MovieType): Promise<Movie[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }

    const response = await fetch(`${backendUrl}/movies/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${type} movies: ${response.statusText}`,
      );
    }

    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    throw error;
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  return getMoviesByType("trending");
}

export async function getPopularMovies(): Promise<Movie[]> {
  return getMoviesByType("popular");
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
	return getMoviesByType("now-playing");
}

export async function getTopRatedMovies(): Promise<Movie[]> {
	return getMoviesByType("top-rated");
}

export async function getUpcomingMovies(): Promise<Movie[]> {
	return getMoviesByType("upcoming");
}
