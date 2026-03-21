import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('detail')
  getDetail(@Query('id') id: string) {
    return this.moviesService.getDetail(id);
  }

  @Get('trending')
  getTrending(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getTrending(page);
  }

  @Get('popular')
  getPopular(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getPopular(page);
  }

  @Get('top-rated')
  getTopRated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getTopRated(page);
  }

  @Get('now-playing')
  getNowPlaying(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getNowPlaying(page);
  }

  @Get('upcoming')
  getUpcoming(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getUpcoming(page);
  }

  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.search(query, page);
  }

  @Get('genres')
  getGenres() {
    return this.moviesService.getGenres();
  }

  @Get('discover')
  discoverByGenre(
    @Query('genreId') genreId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.discoverByGenre(genreId, page);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.getById(String(id));
  }
}
