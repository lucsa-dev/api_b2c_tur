import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BusinessEntity } from '../entities/business.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class BusinessRepository {
  private select = {
    id: true,
    companyName: true,
    cnpj: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(
    business: { companyName: string; cnpj: string },
    user: UserEntity,
  ): Promise<BusinessEntity> {
    const create = this.prisma.business.create({
      data: {
        ...business,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      select: this.select,
    });

    return create;
  }

  async update(
    business: { companyName: string; cnpj: string },
    businessId: number,
  ): Promise<BusinessEntity> {
    const update = this.prisma.business.update({
      where: {
        id: businessId,
      },
      data: {
        ...business,
      },
      select: this.select,
    });

    return update;
  }
}
