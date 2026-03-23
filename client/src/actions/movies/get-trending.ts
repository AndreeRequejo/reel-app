"use server";

import type { Movie } from "@/interfaces/movie";

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }

    const response = await fetch(`${backendUrl}/movies/trending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch trending movies: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
}
