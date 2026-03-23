"use client";

import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/actions";
import { HeroSection, MovieList, Navbar } from "@/components";
import { Movie } from "@/interfaces/movie";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then((d) => setPopular(d));
    getTopRatedMovies().then((d) => setTopRated(d));
    getNowPlayingMovies().then((d) => setNowPlaying(d));
    getUpcomingMovies().then((d) => setUpcoming(d));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovie]);

  return (
    <>
      <Navbar onMovieSelect={setSelectedMovie} />
      <HeroSection onMovieSelect={setSelectedMovie} />
      <MovieList title="POPULARES" movies={popular} onMovieSelect={setSelectedMovie} />
      <MovieList title="MEJOR VALORADAS" movies={topRated} onMovieSelect={setSelectedMovie} />
      <MovieList title="EN CARTELERA" movies={nowPlaying} onMovieSelect={setSelectedMovie} />
      <MovieList title="PRÓXIMAMENTE" movies={upcoming} onMovieSelect={setSelectedMovie} />
    </>
  );
}
