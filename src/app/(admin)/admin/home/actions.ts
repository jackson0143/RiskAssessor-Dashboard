"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardStats() {
  const vendors = await prisma.vendor.findMany();

  const highRisk = vendors.filter((vendor) => vendor.risk!! === "High");

  const statistics = {
    totalVendors: vendors.length,
  };
}
