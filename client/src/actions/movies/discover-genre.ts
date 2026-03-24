"use server";

import type { Movie, MovieResponse } from "@/interfaces/movie";

export async function discoverGenreMovies(query: number): Promise<Movie[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }

    const normalizedQuery = query.toString();

    if (!normalizedQuery) {
      return [];
    }

    const response = await fetch(
      `${backendUrl}/movies/discover?genreId=${encodeURIComponent(normalizedQuery)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to discover movies: ${response.statusText}`);
    }

    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error discovering movies:", error);
    throw error;
  }
}
