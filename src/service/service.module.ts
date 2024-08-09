import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './repositories/business.repository';
import { PrismaService } from '..//prisma/prisma.service';

@Module({
  controllers: [ServiceController],
  providers: [PrismaService, ServiceService, ServiceRepository],
})
export class ServiceModule {}
