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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { Roles } from './decorators/roles.decorator';
import { RoleEnum } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessService } from './business.service';
import { UpdateBusinessDto } from './dto/update-business.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access_token')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly businessService: BusinessService,
  ) {}

  @ApiResponse({
    status: 409,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'A record with this (email or cpf or phone) already exists.',
        },
        error: {
          type: 'string',
          example: 'Conflict',
        },
      },
    },
  })
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  findAll(@Query('page') page = 1) {
    return this.usersService.findAll(page);
  }

  @Get('/me')
  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.BUSINESS)
  getMe(@CurrentUser() currentUser: UserEntity) {
    return this.usersService.findOneById(+currentUser.id);
  }

  @Get(':email')
  @Roles(RoleEnum.ADMIN)
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch()
  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  update(@CurrentUser() currentUSer, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(currentUSer.id, updateUserDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @IsPublic()
  @Post('/business')
  BusinessCreate(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Patch('/business')
  @Roles(RoleEnum.BUSINESS)
  BusinessUpdate(
    @Body() updateBusinessDto: UpdateBusinessDto,
    @CurrentUser() currentUSer,
  ) {
    return this.businessService.update(updateBusinessDto, currentUSer.id);
  }
}
