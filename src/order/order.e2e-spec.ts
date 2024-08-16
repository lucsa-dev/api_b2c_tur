import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import e2eGneralBeforeAll from '../common/tests/e2eGneralBeforeAll';
import testLogin from '../common/tests/login';
import { Queue } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController e2e tests', () => {
  let app: INestApplication;
  let data: any;
  let access_token: string;
  let orderQueue: Queue;

  beforeAll(async () => {
    app = await e2eGneralBeforeAll();
    orderQueue = app.get<Queue>(getQueueToken('order-queue'));

    data = {
      status: 'PENDING',
      serviceId: 1,
      qtd: 2,
    } as CreateOrderDto;

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
    const jobs = await orderQueue.getJobs(['waiting']);

    //assert
    expect(response.status).toBe(201);
    expect(jobs.length).toBe(1);
    expect(jobs[0].data.createOrderDto).toMatchObject(data);
  });
  it('should not create a order with invalid data', async () => {
    //arrange
    //act
    const response = await request(await app.getHttpServer())
      .post('/order')
      .send({
        status: 'PENDING',
        serviceId: 1,
      })
      .set('Authorization', `Bearer ${access_token}`);

    //assert
    expect(response.status).toBe(400);
  });
});
