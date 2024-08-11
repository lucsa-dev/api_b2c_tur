import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { BusinessRepository } from './repositories/business.repository';
import { BusinessEndUser, BusinessEntity } from './entities/business.entity';
import { hashPassword } from './utils/hasPassword';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    private readonly Userrepository: UsersRepository,
    private readonly repository: BusinessRepository,
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<BusinessEndUser> {
    const { companyName, cnpj, ...rest } = createBusinessDto;
    const user = { ...rest } as CreateUserDto;
    const business = {
      companyName,
      cnpj,
    };
    user.password = await hashPassword(user.password);
    const userCreate = await this.Userrepository.create({
      ...user,
      role: ['BUSINESS'],
    });

    const businessCreate = await this.repository.create(business, userCreate);
    return { ...businessCreate, ...userCreate };
  }

  async update(
    updateBusinessDto: UpdateBusinessDto,
    userId: number,
  ): Promise<BusinessEntity> {
    const { companyName, cnpj } = updateBusinessDto;
    const business = {
      companyName,
      cnpj,
    };

    const userResponse = await this.Userrepository.findOneById(userId);

    const businessUpdate = await this.repository.update(
      business,
      userResponse.business.id,
    );
    return businessUpdate;
  }
}
