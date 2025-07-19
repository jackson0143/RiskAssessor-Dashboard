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
          { ownerName: { contains: searchTerm, mode: 'insensitive' } },
          {
            contacts: {
              some: {
                OR: [
                  { name: { contains: searchTerm, mode: 'insensitive' } },
                  { email: { contains: searchTerm, mode: 'insensitive' } },
                ]
              }
            }
          }
        ],
      },
      include: {
        contacts: true,
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
    const vendors = await prisma.vendor.findMany({
      include: {
        contacts: true,
      },
    });
    revalidatePath('/vendors');
  
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
        contacts: true,
        reviews: true,
      },
    });
    return { success: true, vendor };
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return { success: false, error: 'Failed to fetch vendor' };
  }
}

export async function getVendorReview(newvendorId: string) {
  try {
    const vendorReviews = await prisma.vendorReview.findMany({
      where: {
        vendorId: newvendorId,
      },
      include: {
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    

 
    return { vendorReviews };
  } catch (error) {
    console.error('Error fetching vendor reviews:', error);
    return { vendorReviews: [] };
  }
}


export async function getUniqueCategories() {
  try {
    const categories = await prisma.vendor.findMany({
      select: {
        category: true,
      },
    });
    return { success: true, categories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error: 'Failed to fetch categories' };
  }
}
