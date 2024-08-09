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
    where: { email: 'josh.business@gmail.com' },
    update: {},
    create: {
      email: 'josh.business@gmail.com',
      name: 'josh Business',
      password: await hashPassword('s3cr3tP#SSW)RD'),
      role: ['BUSINESS'],
      cpf: '099.199.951-35',
      phone: '85994949494',
    },
  });
  await prisma.business.upsert({
    where: { userId: 3 },
    update: {},
    create: {
      userId: 3,
      companyName: 'josh Business',
      cnpj: '99.999.999/9999-99',
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
