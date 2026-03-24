'use client';
import { useRef } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/interfaces/movie";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieSelect: (id: number) => void;
}

export const MovieList = ({ title, movies, onMovieSelect }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const animateScroll = (targetLeft: number, duration = 520) => {
    const container = scrollRef.current;
    if (!container) return;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startLeft = container.scrollLeft;
    const startTime = performance.now();
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const safeTarget = Math.max(0, Math.min(targetLeft, maxScrollLeft));

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      container.scrollLeft =
        startLeft + (safeTarget - startLeft) * easedProgress;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = container.clientWidth * 0.8;
    const nextLeft =
      direction === "left"
        ? container.scrollLeft - amount
        : container.scrollLeft + amount;

    animateScroll(nextLeft);
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5 px-6 md:px-12">
        <h2 className="font-display text-2xl md:text-3xl tracking-wider">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
          >
            <MdChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
          >
            <MdChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12"
      >
        {movies.map((movie, i) => (
          <div key={movie.id} className="w-40 md:w-50 shrink-0">
            <MovieCard movie={movie} onClick={onMovieSelect} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};
