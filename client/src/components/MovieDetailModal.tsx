/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoIosClose, IoIosPlay } from "react-icons/io";
import { FaStar, FaTicketAlt } from "react-icons/fa";
import { CiClock2, CiCalendar } from "react-icons/ci";
import { Button } from "@/components";
import { MovieDetail } from "@/interfaces/movie";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetail } from "@/actions";

interface MovieDetailModalProps {
  movieId: number | null;
  onClose: () => void;
  onMovieSelect?: (id: number) => void;
}

export const MovieDetailModal = ({
  movieId,
  onClose,
  onMovieSelect,
}: MovieDetailModalProps) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      return;
    }
    setLoading(true);
    setShowTrailer(false);
    getMovieDetail(movieId).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [movieId]);

  const trailer = movie?.videos?.results.find(
    (v) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );

  const director = movie?.credits?.crew.find((c) => c.job === "Director");
  const cast = movie?.credits?.cast.slice(0, 6) || [];

  if (!movieId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto my-8 bg-card rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : movie ? (
            <>
              {/* Backdrop / Trailer — reduced height */}
              <div className="relative aspect-21/9 bg-secondary">
                {showTrailer && trailer ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src={movie.backdrop_path || ""}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                    {trailer && (
                      <button
                        onClick={() => setShowTrailer(true)}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IoIosPlay className="w-7 h-7 fill-primary-foreground text-primary-foreground ml-0.5" />
                        </div>
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors z-10"
                >
                  <IoIosClose className="w-5 h-5" />
                </button>
              </div>

              {/* Compact content */}
              <div className="p-5 md:p-6">
                <div className="flex gap-5">
                  {/* Poster — smaller */}
                  <div className="w-28 shrink-0 hidden md:block -mt-16 relative z-10">
                    <Image
                      src={movie.poster_path || ""}
                      alt={movie.title}
                      width={342}
                      height={513}
                      className="rounded-lg shadow-xl"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-3xl md:text-4xl mb-1">
                      {movie.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                      <span className="flex items-center gap-1 text-gold font-semibold">
                        <FaStar className="w-4 h-4 fill-current" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                      {movie.runtime > 0 && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <CiClock2 className="w-3.5 h-3.5" />
                          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}
                          m
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <CiCalendar className="w-3.5 h-3.5" />
                        {movie.release_date}
                      </span>
                      {director && (
                        <span className="text-muted-foreground">
                          Dir:{" "}
                          <span className="text-foreground">
                            {director.name}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {movie.genres.map((g) => (
                        <span
                          key={g.id}
                          className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>

                    <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">
                      {movie.overview}
                    </p>

                    <Button
                      size="sm"
                      onClick={() => {
                        onClose();
                        <Link href={`/purchase/${movie.id}`} />;
                      }}
                    >
                      <FaTicketAlt className="w-4 h-4 mr-1.5" />
                      Comprar entradas
                    </Button>
                  </div>
                </div>

                {/* Cast — compact inline */}
                {cast.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border">
                    <h3 className="font-display text-lg mb-3 tracking-wider">
                      Reparto
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                      {cast.map((actor) => (
                        <div
                          key={actor.id}
                          className="text-center shrink-0 w-16"
                        >
                          <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-secondary mb-1">
                            {actor.profile_path ? (
                              <Image
                                src={actor.profile_path || ""}
                                alt={actor.name}
                                width={185}
                                height={185}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                ?
                              </div>
                            )}
                          </div>
                          <p className="text-xs font-medium line-clamp-1">
                            {actor.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
