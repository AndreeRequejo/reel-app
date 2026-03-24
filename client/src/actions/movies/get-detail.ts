"use server";

import { MovieDetail } from "@/interfaces/movie";

export async function getMovieDetail(movieId: number): Promise<MovieDetail> {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }

    const response = await fetch(`${backendUrl}/movies/detail/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details:`, error);
    throw error;
  }
}
