import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  server(): string {
    return 'Server is running';
  }
}
