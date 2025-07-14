'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();


export async function getAllVendors() {
  try {
    const vendors = await prisma.vendor.findMany();
    
    return { success: true, vendors };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { success: false, error: 'Failed to fetch vendors' };
  }
}
export async function addVendor(vendorData: {
  name: string;
  email: string;
  address: string;
  phone_no: string;
  industry?: string;
  website?: string;
}) {
  try {
    const vendor = await prisma.vendor.create({
      data: {
        name: vendorData.name,
        email: vendorData.email,
        address: vendorData.address,
        phone_no: vendorData.phone_no,
        industry: vendorData.industry || null,
        website: vendorData.website || null,
        riskScore: 0, // Default value
      },
    });
   
    revalidatePath('/vendors/new');

    return { success: true, vendor };
  } catch (error) {
    console.error('Error creating vendor:', error);
    return { success: false, error: 'Failed to create vendor' };
  }
}

export async function deleteVendor(vendorId: string) {
  try {
    await prisma.vendor.delete({
      where: {
        id: vendorId,
      },
    });
    revalidatePath('/vendors/new');

    return { success: true };
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return { success: false, error: 'Failed to delete vendor' };
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

export async function updateVendor(vendorId: string, vendorData: {
  name?: string;
  email?: string;
  address?: string;
  phone_no?: string;
  industry?: string;
  website?: string;
  riskScore?: number;
}) {
  try {
    const vendor = await prisma.vendor.update({
      where: {
        id: vendorId,
      },
      data: vendorData,
    });

    revalidatePath('/vendors/new');
    revalidatePath(`/vendors/${vendorId}`);

    return { success: true, vendor };
  } catch (error) {
    console.error('Error updating vendor:', error);
    return { success: false, error: 'Failed to update vendor' };
  }
} 

