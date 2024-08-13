/*
  Warnings:

  - The values [BUSINESS] on the enum `RoleEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `businessId` on the `services` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleEnum_new" AS ENUM ('ADMIN', 'AFFILIATE', 'USER', 'COMPANY');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "RoleEnum_new"[] USING ("role"::text::"RoleEnum_new"[]);
ALTER TYPE "RoleEnum" RENAME TO "RoleEnum_old";
ALTER TYPE "RoleEnum_new" RENAME TO "RoleEnum";
DROP TYPE "RoleEnum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_businessId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "businessId",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
