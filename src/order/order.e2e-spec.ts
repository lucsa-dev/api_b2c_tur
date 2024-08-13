import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import e2eGneralBeforeAll from '../common/tests/e2eGneralBeforeAll';
import testLogin from '../common/tests/login';

describe('OrderController e2e tests', () => {
  let app: INestApplication;
  let data: any;
  let access_token: string;

  beforeAll(async () => {
    app = await e2eGneralBeforeAll();

    data = {
      status: 'PENDING',
      serviceId: 1,
      qtd: 2,
    };

    const loginResponse = await testLogin(
      app,
      'josh.test@gmail.com',
      's3cr3tP#SSW)RD',
    );

    access_token = loginResponse.access_token;
  }, 90000);

  it('should create a order', async () => {
    //arrange
    //login no usuário company
    const userCompany = await testLogin(
      app,
      'josh.company2@gmail.com',
      's3cr3tP#SSW)RD',
    );

    //cadastrar um serviço
    const serviceCreate = await request(await app.getHttpServer())
      .post('/service')
      .send({
        title: 'Passeio de Buggy',
        description: 'Passeio de Buggy pelas dunas',
        price: 100,
        status: true,
        categoryId: 1,
      })
      .set('Authorization', `Bearer ${userCompany.access_token}`);

    data.serviceId = serviceCreate.body.id;

    //act
    const response = await request(await app.getHttpServer())
      .post('/order')
      .send(data)
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(201);
  });
});
