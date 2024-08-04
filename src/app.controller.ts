import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators/is-public.decorator';

@Controller()
@IsPublic()
export class AppController {
  constructor() {}
  @Get()
  helloWorld() {
    return 'Hello World!';
  }
}
