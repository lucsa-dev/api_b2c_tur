import { RoleEnum } from '@prisma/client';

export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  role: RoleEnum[];
  iat?: number;
  exp?: number;
}
