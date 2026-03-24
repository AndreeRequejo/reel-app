"use server";

import { Genre, GenreResponse } from "@/interfaces/movie";

export async function getGenres(): Promise<Genre[]> {
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

    const data: GenreResponse = await response.json();
    return data.genres;
  } catch (error) {
    console.error(`Error fetching genres movies:`, error);
    throw error;
  }
}