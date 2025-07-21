/*
  Warnings:

  - You are about to drop the column `formalManagementSystem` on the `VendorReview` table. All the data in the column will be lost.
  - You are about to drop the column `requireSystemAccess` on the `VendorReview` table. All the data in the column will be lost.
  - You are about to drop the column `usesSSO` on the `VendorReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorReview" DROP COLUMN "formalManagementSystem",
DROP COLUMN "requireSystemAccess",
DROP COLUMN "usesSSO",
ADD COLUMN     "canCauseBusinessOutage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maintainsIncidentResponsePlan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "performsVulnerabilityScan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requireFinancialData" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requireOperationData" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "usesAutomatedAccessControl" BOOLEAN NOT NULL DEFAULT false;
