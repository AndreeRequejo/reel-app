import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @Get('detail')
  getDetail(@Query('id') id: string) {
    return this.moviesService.getDetail(id);
  }

  @Public()
  @Get('trending')
  getTrending(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getTrending(page);
  }

  @Public()
  @Get('popular')
  getPopular(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getPopular(page);
  }

  @Public()
  @Get('top-rated')
  getTopRated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getTopRated(page);
  }

  @Public()
  @Get('now-playing')
  getNowPlaying(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getNowPlaying(page);
  }

  @Public()
  @Get('upcoming')
  getUpcoming(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.getUpcoming(page);
  }

  @Public()
  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.search(query, page);
  }

  @Public()
  @Get('genres')
  getGenres() {
    return this.moviesService.getGenres();
  }

  @Public()
  @Get('discover')
  discoverByGenre(
    @Query('genreId') genreId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.moviesService.discoverByGenre(genreId, page);
  }

  @Public()
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.getById(String(id));
  }
}
