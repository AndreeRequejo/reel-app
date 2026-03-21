import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('showtimes')
export class Showtime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  movieId: string;

  @Column('date', { nullable: false })
  date: string;

  @Column('time', { nullable: false })
  time: string;
}
