/*
  Warnings:

  - You are about to drop the column `name` on the `business` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business" DROP COLUMN "name",
ADD COLUMN     "companyName" TEXT NOT NULL;
