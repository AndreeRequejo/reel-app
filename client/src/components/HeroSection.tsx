'use client';
import { getTrendingMovies } from "@/actions/movies/get-trending";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Movie } from "@/interfaces/movie";
import { Button } from "./ui/Button";
import { FaStar } from "react-icons/fa";
import { IoInformationCircleOutline, IoPlay } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";

interface HeroSectionProps {
  onMovieSelect: (id: number) => void;
}

export const HeroSection = ({ onMovieSelect }: HeroSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    getTrendingMovies().then((data) => setMovies(data.slice(0, 5)));
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) {
    return <div className="relative h-[85vh] bg-secondary animate-pulse" />;
  }

  const movie = movies[current];

  return (
    <div className="relative h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={movie.backdrop_path || ""}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-3xl">
        <motion.div
          key={movie.id + "-text"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-gold font-semibold text-lg">
              <FaStar className="w-5 h-5 fill-current" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              {movie.release_date?.split("-")[0]}
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-4">
            {movie.title}
          </h1>

          <p className="text-foreground/70 text-base md:text-lg max-w-xl mb-8 line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8"
              onClick={() => onMovieSelect(movie.id)}
            >
              <IoPlay className="w-5 h-5" />
              Ver Trailer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 text-foreground hover:bg-foreground/10 gap-2 text-lg px-8"
              onClick={() => onMovieSelect(movie.id)}
            >
              <IoInformationCircleOutline className="w-5 h-5" />
              Más Info
            </Button>
          </div>
        </motion.div>

        <div className="flex gap-2 mt-8">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-10 bg-primary"
                  : "w-4 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
