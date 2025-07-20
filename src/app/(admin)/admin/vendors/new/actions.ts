'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getAllVendors() {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        contacts: true,
      },
    });
    
    return { success: true, vendors };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { success: false, error: 'Failed to fetch vendors' };
  }
}

export async function addVendor(vendorData: {
  name: string;
  ownerName?: string;
  website?: string;
  securityMaturity?: string;
  impact?: string;
  category?: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    role: string;
    department: string;
  };
  secondaryContact: {
    name: string;
    email: string;
    phone: string;
    role: string;
    department: string;
  };
}) {
  try {
    const vendor = await prisma.vendor.create({
      data: {
        name: vendorData.name,
        ownerName: vendorData.ownerName || null,
        website: vendorData.website || null,
        maturityScore: 0,
        maturityRating: 'N/A',
        impactScore: 0,
        impactRating: 'N/A',
        riskScore: 0,
        riskRating: 'N/A',
        category: vendorData.category || null,
        description: vendorData.description || null,
        status: vendorData.status,
        
        contacts: {
          create: (() => {
            const contacts: Array<{
              name: string;
              email: string;
              phone: string | null;
              role: string | null;
              department: string | null;
              type: 'PRIMARY' | 'SECONDARY';
            }> = [
              // Primary contact
              {
                name: vendorData.primaryContact.name,
                email: vendorData.primaryContact.email,
                phone: vendorData.primaryContact.phone || null,
                role: vendorData.primaryContact.role || null,
                department: vendorData.primaryContact.department || null,
                type: 'PRIMARY',
              }
            ];
            
            // Add secondary contact if name is provided
            if (vendorData.secondaryContact.name) {
              contacts.push({
                name: vendorData.secondaryContact.name,
                email: vendorData.secondaryContact.email,
                phone: vendorData.secondaryContact.phone || null,
                role: vendorData.secondaryContact.role || null,
                department: vendorData.secondaryContact.department || null,
                type: 'SECONDARY',
              });
            }
            
            return contacts;
          })(),
        },
      },
      include: {
        contacts: true,
      },
    });
   
    revalidatePath('/vendors/new');
    revalidatePath('/vendors');

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
    revalidatePath('/vendors');

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

export async function updateVendor(vendorId: string, vendorData: {
  name?: string;
  ownerName?: string;
  website?: string;
  securityMaturity?: string;
  impact?: string;
  category?: string;
  description?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  riskScore?: number;
}) {
  try {
    const vendor = await prisma.vendor.update({
      where: {
        id: vendorId,
      },
      data: vendorData,
      include: {
        contacts: true,
      },
    });

    revalidatePath('/vendors/new');
    revalidatePath(`/vendors/${vendorId}`);
    revalidatePath('/vendors');

    return { success: true, vendor };
  } catch (error) {
    console.error('Error updating vendor:', error);
    return { success: false, error: 'Failed to update vendor' };
  }
} 

