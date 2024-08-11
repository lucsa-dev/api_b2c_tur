import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './repositories/service.repository';
import { UsersService } from '../users/users.service';
@Injectable()
export class ServiceService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createServiceDto: CreateServiceDto, UserId: number) {
    const user = await this.usersService.findOneById(UserId);

    return this.repository.create(createServiceDto, user.business.id);
  }

  findAll(pagination: { page: number; limit: number }) {
    return this.repository.findAll(pagination);
  }

  findOne(id: number) {
    return this.repository.findOneById(id);
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.repository.update(id, updateServiceDto);
  }

  async remove(id: number, userId: number) {
    // usuario que esta deletando
    const user = await this.usersService.findOneById(userId);
    // usuario que esta sendo deletado
    const service = await this.repository.findOneById(id);
    if (user.business.id != service.businessId) {
      throw new ForbiddenException(
        'You can only delete services created by your company!',
      );
    }
    return this.repository.remove(id);
  }
}
