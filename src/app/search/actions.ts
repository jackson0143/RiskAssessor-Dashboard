'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function searchUsers(searchTerm: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },    

      take:20
    });
    return { success: true, users };
  } catch (error) {
    console.error('Error searching users:', error);
    return { success: false, error: 'Failed to search users' };
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return { success: true, users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}