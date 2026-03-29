export interface Purchase {
  id: number;
  movieId: string;
  movieName: string;
  date: string;
  time: string;
  people: number;
  seats: string[];
  totalPrice: number;
}