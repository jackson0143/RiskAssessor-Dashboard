-- AlterTable
ALTER TABLE "VendorReview" ADD COLUMN     "companyIndustry" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "hasISO27001" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "individualAccounts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isoCertExpiryDate" TIMESTAMP(3),
ADD COLUMN     "isoCertUrl" TEXT,
ADD COLUMN     "roleBasedAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "usesMFA" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "usesSSO" BOOLEAN NOT NULL DEFAULT false;
