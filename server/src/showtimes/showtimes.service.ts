import { Injectable } from '@nestjs/common';
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

  create(createShowtimeDto: CreateShowtimeDto) {
    const showtime = this.showtimeRepository.create(createShowtimeDto);
    return this.showtimeRepository.save(showtime);
  }

  findAll() {
    return this.showtimeRepository.find();
  }

  findOne(id: string) {
    return this.showtimeRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.showtimeRepository.delete({ id });
  }
}
