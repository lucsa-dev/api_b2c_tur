import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { AppModule } from '../../app.module';

export default async function e2eGneralBeforeAll(): Promise<INestApplication> {
  //database test container
  const container = await new PostgreSqlContainer().start();
  const urlConnection = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getPort()}/${container.getDatabase()}?schema=public`;
  process.env.DATABASE_URL = urlConnection;
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
    imports: [AppModule],
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
