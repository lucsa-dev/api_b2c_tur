import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';
import { execSync } from 'child_process';
import { AppModule } from '../../app.module';
import { BullModule } from '@nestjs/bullmq';

export default async function e2eGneralBeforeAll(): Promise<INestApplication> {
  //database test container
  const containerPostgresql = await new PostgreSqlContainer().start();
  const containerRedis = await new RedisContainer().start();
  const urlConnection = `postgresql://${containerPostgresql.getUsername()}:${containerPostgresql.getPassword()}@${containerPostgresql.getHost()}:${containerPostgresql.getPort()}/${containerPostgresql.getDatabase()}?schema=public`;
  process.env.DATABASE_URL = urlConnection;
  process.env.REDIS_HOST = containerRedis.getHost();
  process.env.REDIS_PORT = containerRedis.getPort().toString();
  const prismaConfig = {
    env: {
      ...process.env,
      DATABASE_URL: urlConnection,
    },
  };
  execSync('npx prisma db push', prismaConfig);
  execSync('npm run prisma:seed ', prismaConfig);

  //app
  const module = await Test.createTestingModule({
    imports: [
      AppModule,
      BullModule.forRoot({
        connection: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        },
      }),
    ],
  }).compile();
  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  return await app.init();
}
