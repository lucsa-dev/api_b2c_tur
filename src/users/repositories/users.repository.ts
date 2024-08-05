import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserWithRole } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity, UserWithPasswordEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private select = {
    id: true,
    email: true,
    name: true,
    cpf: true,
    phone: true,
    role: true,
    email_verified_at: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  }

  async cpfExists(cpf: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });
    return !!user;
  }

  async create(createUserDto: UserWithRole): Promise<UserEntity> {
    const emailExists = await this.emailExists(createUserDto.email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const cpfExists = await this.cpfExists(createUserDto.cpf);
    if (cpfExists) {
      throw new ConflictException('cpf already exists');
    }

    return this.prisma.user.create({
      data: createUserDto,
      select: this.select,
    });
  }

  async findAll(page: number): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      select: this.select,
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  async findOne(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
      select: this.select,
    });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.select,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: this.select,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: this.select,
    });
  }

  async findOneWithPassword(email: string): Promise<UserWithPasswordEntity> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { ...this.select, password: true },
    });
  }
}
