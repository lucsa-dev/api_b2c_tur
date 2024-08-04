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
      cpf: '099.199.951-33',
      phone: '85994949493',
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
