import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import e2eGneralBeforeAll from '../common/tests/e2eGneralBeforeAll';

describe('AuthController e2e tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await e2eGneralBeforeAll();
  }, 10000);

  it('should set access_token in POST /login', async () => {
    //arrange
    //act
    const response = await request(await app.getHttpServer())
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'josh.dev@gmail.com',
        password: 's3cr3tP#SSW)RD',
      });

    //assert
    expect(response.status).toBe(200);
    expect(response.body.access_token).toBeDefined();
  });
});
