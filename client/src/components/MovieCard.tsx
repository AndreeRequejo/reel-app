import Image from "next/image";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";
import { Movie } from "@/interfaces/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void;
  index?: number;
}

export const MovieCard = ({ movie, onClick, index = 0 }: MovieCardProps) => {
  const poster = movie.poster_path;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => onClick(movie.id)}
      className="group cursor-pointer shrink-0"
    >
      <div className="relative overflow-hidden rounded-lg aspect-2/3 bg-secondary mb-3">
        {poster ? (
          <Image
            src={poster}
            alt={movie.title}
            width={342}
            height={513}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-foreground/80 line-clamp-3">
            {movie.overview}
          </p>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm text-gold px-2 py-1 rounded-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          <FaStar className="w-3 h-3 fill-current" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
        {movie.title}
      </h3>
      <p className="text-xs text-muted-foreground">
        {movie.release_date?.split("-")[0]}
      </p>
    </motion.div>
  );
};

