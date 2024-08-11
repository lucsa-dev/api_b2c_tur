import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import e2eGneralBeforeAll from '../common/tests/e2eGneralBeforeAll';
import testLogin from '../common/tests/login';

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

    const loginResponse = await testLogin(
      app,
      'josh.business@gmail.com',
      's3cr3tP#SSW)RD',
    );

    data.businessId = loginResponse.user.business.id;

    access_token = loginResponse.access_token;
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

  //should get all services
  it('should get all services', async () => {
    //arrange

    //cadastrar 40 services
    for (let i = 0; i < 40; i++) {
      await request(await app.getHttpServer())
        .post('/service')
        .send(data)
        .set('Authorization', `Bearer ${access_token}`);
    }

    //act
    const response = await request(await app.getHttpServer())
      .get('/service?page=3')
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: data.title,
          description: data.description,
          price: data.price,
          status: data.status,
        }),
      ]),
    );
    expect(response.body.length).toBe(10);
  });

  //should update a service
  it('should update a service', async () => {
    //arrange
    const updateData = {
      title: 'Passeio de Buggy Atualizado',
      description: 'Passeio de Buggy pelas dunas Atualizado',
      price: 200,
      status: false,
    };

    //act
    const response = await request(await app.getHttpServer())
      .patch('/service/1')
      .send(updateData)
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: updateData.title,
        description: updateData.description,
        price: updateData.price,
        status: updateData.status,
      }),
    );
  });

  it('should delete a service', async () => {
    //arrange

    //act
    const response = await request(await app.getHttpServer())
      .delete('/service/1')
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        status: expect.any(Boolean),
      }),
    );
  });

  it('should not delete a service if user is not a business creator', async () => {
    //arrange
    // create a service with another user
    const loginResponse = await testLogin(
      app,
      'josh.business2@gmail.com',
      's3cr3tP#SSW)RD',
    );

    const data2 = {
      title: 'Passeio de Buggy',
      description: 'Passeio de Buggy pelas dunas',
      price: 100,
      status: true,
      businessId: loginResponse.user.business.id,
    };

    const serviceCreate = await request(await app.getHttpServer())
      .post('/service')
      .send(data2)
      .set('Authorization', `Bearer ${loginResponse.access_token}`);

    //act
    const response = await request(await app.getHttpServer())
      .delete(`/service/${serviceCreate.body.id}`)
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(403);
  });
});
