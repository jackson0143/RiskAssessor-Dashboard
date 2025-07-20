"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardStats() {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startOfNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  const thirtyDaysFromNow = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  const [
    totalVendors,
    highRiskVendorCount,
    mediumRiskVendorCount,
    lowRiskVendorCount,
    totalAssessedVendorCount,
    dueThisMonth,
  ] = await prisma.$transaction([
    prisma.vendor.count(),
    prisma.vendor.count({ where: { riskRating: "HIGH" } }),
    prisma.vendor.count({ where: { riskRating: "MEDIUM" } }),
    prisma.vendor.count({ where: { riskRating: "LOW" } }),
    prisma.vendor.count({
      where: { riskRating: { not: null } },
    }),
    prisma.vendor.count({
      where: { nextReviewDate: { gt: startOfMonth, lt: startOfNextMonth } },
    }),
  ]);

  const upcomingReviews = prisma.vendor.findMany({
    where: { nextReviewDate: { lt: thirtyDaysFromNow } },
  });

  return {
    totalVendors: totalVendors,
    highRiskVendorCount: highRiskVendorCount,
    mediumRiskVendorCount: mediumRiskVendorCount,
    lowRiskVendorCount: lowRiskVendorCount,
    dueThisMonth: dueThisMonth,
    totalAssessedVendorCount: totalAssessedVendorCount,
    upcomingReviews: upcomingReviews,
  };
}
