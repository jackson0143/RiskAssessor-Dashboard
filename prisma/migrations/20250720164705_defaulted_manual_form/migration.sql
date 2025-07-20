/*
  Warnings:

  - You are about to drop the column `companyIndustry` on the `VendorReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorReview" DROP COLUMN "companyIndustry",
ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "formalManagementSystem" BOOLEAN NOT NULL DEFAULT false;
