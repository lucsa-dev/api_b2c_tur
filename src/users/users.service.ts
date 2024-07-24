import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity, UserWithPasswordEntity } from './entities/user.entity';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const create = this.repository.create({ ...createUserDto, role: ['USER'] });
    return create;
  }

  findAll(page: number = 1): Promise<UserEntity[]> {
    return this.repository.findAll(page);
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne(email);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.repository.findOneById(id);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  async findOneWithPassword(email: string): Promise<UserWithPasswordEntity> {
    const user = await this.repository.findOneWithPassword(email);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.repository.findOneById(id);
    if (!user) {
      throw new NotFoundError('User not found!');
    }
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number): Promise<UserEntity> {
    return this.repository.remove(id);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
