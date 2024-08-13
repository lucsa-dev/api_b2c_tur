import { UserEntity } from './user.entity';

export class CompanyEntity {
  id: number;
  companyName: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CompanyEndUser = CompanyEntity & UserEntity;
