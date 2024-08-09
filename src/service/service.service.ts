import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './repositories/business.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  create(createServiceDto: CreateServiceDto) {
    return this.repository.create(createServiceDto);
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return this.repository.findOneById(id);
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    console.log(
      '🚀 ~ ServiceService ~ update ~ updateServiceDto:',
      updateServiceDto,
    );
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
