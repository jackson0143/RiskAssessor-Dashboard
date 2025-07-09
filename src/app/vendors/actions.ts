'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';


const prisma = new PrismaClient();

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return { success: true, users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}

export async function addUser(name: string, email: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    console.log('User created, revalidating path...');
    revalidatePath('/vendors');
    console.log('Path revalidated');
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

export async function deleteUser(userId: number) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    console.log('User deleted, revalidating path...');
    revalidatePath('/vendors');
    console.log('Path revalidated');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
} 

