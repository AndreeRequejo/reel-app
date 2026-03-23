"use server";

import { Genre } from "@/interfaces/movie";

export async function getMoviesByType(): Promise<Genre[]> {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }

    const response = await fetch(`${backendUrl}/movies/genres`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch genres movies: ${response.statusText}`,
      );
    }

    const data: Genre[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching genres movies:`, error);
    throw error;
  }
}