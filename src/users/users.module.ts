import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessController } from './business.controller';

@Module({
  controllers: [UsersController, BusinessController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
