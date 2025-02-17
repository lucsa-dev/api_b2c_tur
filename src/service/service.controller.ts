import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '..//users/decorators/roles.decorator';
import { RoleEnum } from '@prisma/client';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('service')
@Controller('service')
@ApiBearerAuth('access_token')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @Roles(RoleEnum.COMPANY)
  create(
    @Body() createServiceDto: CreateServiceDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.serviceService.create(createServiceDto, currentUser.id);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('price') price?: number,
  ) {
    return this.serviceService.findAll({
      page,
      limit,
      filters: {
        title,
        description,
        price,
      },
    });
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.COMPANY)
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.serviceService.update(+id, updateServiceDto, currentUser.id);
  }

  @Delete(':id')
  @Roles(RoleEnum.COMPANY)
  remove(@Param('id') id: string, @CurrentUser() currentUser: UserEntity) {
    return this.serviceService.remove(+id, currentUser.id);
  }
}
