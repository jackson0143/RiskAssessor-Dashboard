/*
  Warnings:

  - You are about to drop the column `additionalNotes` on the `VendorReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorReview" DROP COLUMN "additionalNotes",
ADD COLUMN     "additionalNotesImpact" TEXT,
ADD COLUMN     "additionalNotesMaturity" TEXT,
ADD COLUMN     "requirePersonalData" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requireSystemAccess" BOOLEAN NOT NULL DEFAULT false;
