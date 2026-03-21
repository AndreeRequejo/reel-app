import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from './entities/showtime.entity';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
  ) {}

  async create(createShowtimeDto: CreateShowtimeDto) {
    const showtime = this.showtimeRepository.create(createShowtimeDto);
    return await this.showtimeRepository.save(showtime);
  }

  async findAll() {
    return await this.showtimeRepository.find();
  }

  async findOne(movieId: string) {
    const showtime = await this.showtimeRepository.findOneBy({
      movieId: movieId,
    });

    if (!showtime) {
      throw new NotFoundException(`No showtime found for movieId: ${movieId}`);
    }

    return showtime;
  }

  async remove(id: string) {
    return await this.showtimeRepository.delete({ id });
  }
}
