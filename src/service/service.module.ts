import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './repositories/service.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  controllers: [ServiceController],
  providers: [
    PrismaService,
    ServiceService,
    ServiceRepository,
    UsersService,
    UsersRepository,
  ],
})
export class ServiceModule {}
