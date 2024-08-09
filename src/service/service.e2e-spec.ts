import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import e2eGneralBeforeAll from '../common/tests/e2eGneralBeforeAll';

describe('ServiceController e2e tests', () => {
  let app: INestApplication;
  let data: any;
  let access_token: string;

  beforeAll(async () => {
    app = await e2eGneralBeforeAll();

    data = {
      title: 'Passeio de Buggy',
      description: 'Passeio de Buggy pelas dunas',
      price: 100,
      status: true,
    };

    const loginResponse = await request(await app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'josh.business@gmail.com',
        password: 's3cr3tP#SSW)RD',
      });

    const meResponse = await request(await app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`);

    data.businessId = meResponse.body.business.id;

    access_token = loginResponse.body.access_token;
  }, 90000);

  it('should create a service if user roles == business', async () => {
    //arrange

    //act
    const response = await request(await app.getHttpServer())
      .post('/service')
      .send(data)
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: data.title,
        description: data.description,
        price: data.price,
        status: data.status,
      }),
    );
  });

  it('should not create a service if user is not business', async () => {
    //arrange

    //act
    const response = await request(await app.getHttpServer())
      .post('/service')
      .send(data)
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(201);
  });

  it('should get a service by id', async () => {
    //arrange

    //act
    const response = await request(await app.getHttpServer()).get('/service/1');

    //assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: data.title,
        description: data.description,
        price: data.price,
        status: data.status,
      }),
    );
  });
});
