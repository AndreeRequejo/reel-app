'use client';
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MovieCard } from "./MovieCard";
import { Genre, Movie } from "@/interfaces/movie";
import { discoverGenreMovies, getGenres } from "@/actions";

interface GenreExplorerProps {
  onMovieSelect: (id: number) => void;
}

const GenreExplorer = ({ onMovieSelect }: GenreExplorerProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
      if (data.length > 0) {
        setSelectedGenre(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;
    setLoading(true);
    discoverGenreMovies(selectedGenre).then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, [selectedGenre]);

  return (
    <section className="py-12 px-6 md:px-12">
      <h2 className="font-display text-2xl md:text-3xl tracking-wider mb-6">
        Explorar por Género
      </h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGenre(g.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedGenre === g.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 rounded-lg bg-secondary animate-pulse"
            />
          ))}
        </div>
      ) : (
        <motion.div
          key={selectedGenre}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4"
        >
          {movies.slice(0, 18).map((movie, i) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieSelect}
              index={i}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default GenreExplorer;
