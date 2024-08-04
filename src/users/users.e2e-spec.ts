import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import e2eGneralBeforeAll from '../common/tests/e2eGneralBeforeAll';

describe('UsersController e2e tests', () => {
  let app: INestApplication;
  let data: any;
  let dataBusiness: any;
  let access_token: string;

  beforeAll(async () => {
    app = await e2eGneralBeforeAll();

    data = {
      name: 'josh doe',
      email: 'josh@gmail.com',
      cpf: '040.199.951-33',
      phone: '85994949494',
      password: '12345',
    };

    dataBusiness = {
      ...data,
      companyName: 'josh doe',
      cnpj: '65',
    };
  }, 90000);

  it('should create a user', async () => {
    //arrange
    //act
    const response = await request(await app.getHttpServer())
      .post('/users')
      .send(data);

    //assert
    expect(response.status).toBe(201);
  });

  it('should set access_token in POST /login', async () => {
    //arrange
    //act
    const response = await request(await app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: data.email,
        password: data.password,
      });

    access_token = response.body.access_token;

    //assert
    expect(response.status).toBe(200);
    expect(response.body.access_token).toBeDefined();
  });

  it('GET /users/me return user data', async () => {
    //arrange
    //act
    const response = await request(await app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(data.name);
    expect(response.body.cpf).toBe(data.cpf);
    expect(response.body.email).toBe(data.email);
  });

  // business users

  it('should create a user business ', async () => {
    //arrange
    //act
    const response = await request(await app.getHttpServer())
      .post('/business')
      .send(dataBusiness);

    //assert
    expect(response.status).toBe(201);
  });
});
