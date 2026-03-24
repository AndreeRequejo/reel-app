"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { searchMovies } from "@/actions";
import { Movie } from "@/interfaces/movie";
import { MovieCard } from "./MovieCard";

interface SearchBarProps {
  onMovieSelect: (movideId: number) => void;
}

export const SearchBar = ({ onMovieSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setResults(data.slice(0, 12));
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 400);
  }, [query]);

  const handleSelect = (id: number) => {
    onMovieSelect(id);
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer"
      >
        <IoSearchOutline className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-4xl mx-auto pt-20 px-6">
              <div className="flex items-center gap-4 border-b border-border pb-4 mb-8">
                <IoSearchOutline className="w-6 h-6 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar películas..."
                  className="flex-1 bg-transparent text-2xl font-display tracking-wider outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <IoIosClose className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>

              {loading && (
                <div className="text-center text-muted-foreground py-12">
                  Buscando...
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {results.map((movie, i) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={handleSelect}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  No se encontraron resultados para `{query}`
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
