import { INestApplication } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
import * as request from 'supertest';

interface LoginResponse {
  user: UserEntity;
  access_token: string;
}

export default async function testLogin(
  app: INestApplication,
  email: string,
  password: string,
): Promise<LoginResponse> {
  const loginResponse = await request(await app.getHttpServer())
    .post('/login')
    .set('Accept', 'application/json')
    .send({
      email,
      password,
    });

  const userResponse = await request(await app.getHttpServer())
    .get('/users/me')
    .set('Authorization', `Bearer ${loginResponse.body.access_token}`);

  return {
    user: userResponse.body as UserEntity,
    access_token: loginResponse.body.access_token,
  };
}
