import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceEntity } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';

@Injectable()
export class ServiceRepository {
  private select = {
    id: true,
    title: true,
    description: true,
    price: true,
    status: true,
    businessId: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(service: CreateServiceDto): Promise<ServiceEntity> {
    const { businessId, ...serviceData } = service;
    const create = await this.prisma.service.create({
      data: {
        ...serviceData,
        business: {
          connect: {
            id: businessId,
          },
        },
      },
      select: this.select,
    });

    return create;
  }

  async findOneById(id: number): Promise<ServiceEntity> {
    return this.prisma.service.findUnique({
      where: { id },
      select: this.select,
    });
  }
}
