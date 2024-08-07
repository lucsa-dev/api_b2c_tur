-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "businessId" INTEGER NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
