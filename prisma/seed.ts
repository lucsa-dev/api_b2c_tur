import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'josh.dev@gmail.com' },
    update: {},
    create: {
      email: 'josh.dev@gmail.com',
      name: 'josh Almeida',
      password: await hashPassword('s3cr3tP#SSW)RD'),
      role: ['ADMIN'],
      cpf: '999.999.999-99',
      phone: '85994545454',
    },
  });
  await prisma.user.upsert({
    where: { email: 'josh.test@gmail.com' },
    update: {},
    create: {
      email: 'josh.test@gmail.com',
      name: 'josh Tester',
      password: await hashPassword('s3cr3tP#SSW)RD'),
      role: ['USER'],
      cpf: '099.199.951-34',
      phone: '85994949493',
    },
  });
  await prisma.user.upsert({
    where: { email: 'josh.company@gmail.com' },
    update: {},
    create: {
      email: 'josh.company@gmail.com',
      name: 'josh company',
      password: await hashPassword('s3cr3tP#SSW)RD'),
      role: ['COMPANY'],
      cpf: '099.199.951-35',
      phone: '85994949494',
    },
  });
  await prisma.company.upsert({
    where: { userId: 3 },
    update: {},
    create: {
      userId: 3,
      companyName: 'josh company',
      cnpj: '99.999.999/9999-99',
    },
  });
  await prisma.user.upsert({
    where: { email: 'josh.company2@gmail.com' },
    update: {},
    create: {
      email: 'josh.company2@gmail.com',
      name: 'josh company two',
      password: await hashPassword('s3cr3tP#SSW)RD'),
      role: ['COMPANY'],
      cpf: '099.199.951-36',
      phone: '85994949495',
    },
  });
  await prisma.company.upsert({
    where: { userId: 4 },
    update: {},
    create: {
      userId: 4,
      companyName: 'josh company two',
      cnpj: '99.999.999/9999-98',
    },
  });
  //adicionar categorias
  await prisma.serviceCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Passeio de Buggy',
      description: 'Passeio de Buggy pelas dunas',
    },
  });
  await prisma.serviceCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Passeio de Helicóptero',
      description: 'Passeio de helicóoptero pela cidade',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
