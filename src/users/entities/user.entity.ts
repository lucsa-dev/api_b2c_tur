import { RoleEnum, User } from '@prisma/client';

export class UserEntity implements Omit<User, 'password'> {
  id: number;
  email: string;
  phone: string;
  cpf: string;
  name: string;
  role: RoleEnum[];
  email_verified_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UserWithPasswordEntity extends UserEntity {
  password: string;
}
