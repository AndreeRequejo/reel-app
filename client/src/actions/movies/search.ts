"use server";

import type { Movie, MovieResponse } from "@/interfaces/movie";

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return [];
    }

    const response = await fetch(
      `${backendUrl}/movies/search?query=${encodeURIComponent(normalizedQuery)}`,
      {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to search movies: ${response.statusText}`);
    }

    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}
