/*
  Warnings:

  - You are about to drop the column `bedRoom` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `furnitureType` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `Rental` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "bedRoom",
DROP COLUMN "furnitureType",
DROP COLUMN "propertyType";

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "propertyType" TEXT,
    "bedRoom" TEXT,
    "furnitureType" TEXT,
    "rentalId" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extra" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "propertyId" INTEGER,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
