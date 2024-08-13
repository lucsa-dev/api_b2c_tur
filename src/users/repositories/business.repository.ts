import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompanyEntity } from '../entities/company.entity';
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
    company: { companyName: string; cnpj: string },
    user: UserEntity,
  ): Promise<CompanyEntity> {
    const create = this.prisma.company.create({
      data: {
        ...company,
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
    company: { companyName: string; cnpj: string },
    companyId: number,
  ): Promise<CompanyEntity> {
    const update = this.prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...company,
      },
      select: this.select,
    });

    return update;
  }
}
