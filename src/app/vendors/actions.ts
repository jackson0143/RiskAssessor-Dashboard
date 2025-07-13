'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function searchVendors(searchTerm: string) {
  try {
    const vendors = await prisma.vendor.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { phone_no: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },    
      take: 20
    });
    return { success: true, vendors };
  } catch (error) {
    console.error('Error searching vendors:', error);
    return { success: false, error: 'Failed to search vendors' };
  }
}

export async function getAllVendors() {
  try {
    const vendors = await prisma.vendor.findMany();
    revalidatePath('/search');
  
    return { success: true, vendors };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { success: false, error: 'Failed to fetch vendors' };
  }
}

export async function getVendorById(vendorId: string) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
      include: {
        reviews: true,
      },
    });
    return { success: true, vendor };
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return { success: false, error: 'Failed to fetch vendor' };
  }
}