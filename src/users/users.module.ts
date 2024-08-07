import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessService } from './business.service';
import { BusinessRepository } from './repositories/business.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    BusinessService,
    PrismaService,
    UsersRepository,
    BusinessRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}
