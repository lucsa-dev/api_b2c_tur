import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceEntity } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class ServiceRepository {
  private select = {
    id: true,
    title: true,
    description: true,
    price: true,
    status: true,
    categoryId: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(
    service: CreateServiceDto,
    companyId: number,
  ): Promise<ServiceEntity> {
    const { categoryId, ...rest } = service;
    const create = await this.prisma.service.create({
      data: {
        ...rest,
        company: {
          connect: {
            id: companyId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      select: this.select,
    });

    return create;
  }

  async findAll(query: {
    page: number;
    limit: number;
    filters: {
      title?: string;
      description?: string;
      price?: number;
    };
  }): Promise<ServiceEntity[]> {
    const { page, limit } = query;
    const { title, description, price } = query.filters;
    const where: any = {};
    if (title) {
      where.title = { contains: title };
    }
    if (description) {
      where.description = { contains: description };
    }
    if (price) {
      where.price = price;
    }
    return this.prisma.service.findMany({
      select: this.select,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOneById(id: number): Promise<ServiceEntity> {
    return this.prisma.service.findUnique({
      where: { id },
      select: this.select,
    });
  }

  async update(id: number, service: UpdateServiceDto): Promise<ServiceEntity> {
    return await this.prisma.service.update({
      where: { id },
      data: {
        ...service,
      },
      select: this.select,
    });
  }

  async remove(id: number): Promise<ServiceEntity> {
    return this.prisma.service.delete({
      where: { id },
      select: this.select,
    });
  }
}
