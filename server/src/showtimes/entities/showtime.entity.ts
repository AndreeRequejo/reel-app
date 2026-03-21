import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('showtimes')
export class Showtime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string', { nullable: false, unique: true })
  movieId: string;

  @Column('date', { nullable: false })
  date: string;

  @Column('time', { nullable: false })
  time: string;
}
