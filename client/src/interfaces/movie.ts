export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  status: string;
  runtime: number;
  credits?: {
    cast: {
      id: number;
      name: string;
      character?: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job?: string;
      profile_path: string | null;
    }[];
  };
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse<TMovie = Movie> {
  page: number;
  total_pages: number;
  total_results: number;
  results: TMovie[];
}

export interface GenreResponse {
  genres: Genre[];
}