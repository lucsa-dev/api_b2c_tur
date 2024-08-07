import { UserEntity } from './user.entity';

export class BusinessEntity {
  id: number;
  companyName: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BusinessEndUser = BusinessEntity & UserEntity;
