'use client';
import { IoSearchOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

interface SearchBarProps {
  onMovieSelect: (movideId: number) => void;
}

export const SearchBar = ({ onMovieSelect }: SearchBarProps) => {
  return (
    <>
      <button
        onClick={() => {}}
        className="p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer"
      >
        <IoSearchOutline className="w-5 h-5" />
      </button>

      {/* <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-4xl mx-auto pt-20 px-6">
              <div className="flex items-center gap-4 border-b border-border pb-4 mb-8">
                <Search className="w-6 h-6 text-muted-foreground" />
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
                  <X className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
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
                  No se encontraron resultados para "{query}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};
