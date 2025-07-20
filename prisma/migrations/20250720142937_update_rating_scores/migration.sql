/*
  Warnings:

  - You are about to drop the column `impact` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `securityMaturity` on the `Vendor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "impact",
DROP COLUMN "securityMaturity",
ADD COLUMN     "impactRating" TEXT,
ADD COLUMN     "impactScore" INTEGER,
ADD COLUMN     "maturityRating" TEXT,
ADD COLUMN     "maturityScore" INTEGER,
ADD COLUMN     "riskRating" TEXT,
ALTER COLUMN "riskScore" DROP NOT NULL,
ALTER COLUMN "riskScore" DROP DEFAULT;

-- AlterTable
ALTER TABLE "VendorReview" ADD COLUMN     "impactRating" TEXT,
ADD COLUMN     "impactScore" INTEGER,
ADD COLUMN     "maturityRating" TEXT,
ADD COLUMN     "maturityScore" INTEGER,
ADD COLUMN     "riskRating" TEXT,
ADD COLUMN     "riskScore" INTEGER;
