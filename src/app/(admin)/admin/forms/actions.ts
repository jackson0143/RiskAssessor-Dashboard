"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client';
import { uploadISO27001Certificate, getSignedUrl } from "@/lib/upload-helpers";

const prisma = new PrismaClient();

export async function filterCompanyNames(searchTerm: string) {
  try {


    const companies = await prisma.vendor.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true
      },
      take: 15,
      orderBy: {
        name: 'asc'
      }
    });

    return { success: true, companies };
  } catch (error) {
    console.error('Error filtering company names:', error);
    return { success: false, companies: [] };
  }
}

export async function generateSignedUrl(filePath: string) {
  try {
    const signedUrl = await getSignedUrl(filePath);
    return { success: true, signedUrl };
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return { success: false, signedUrl: null };
  }
}

export async function createForm(formData: FormData) {
  try {
    // Extract form data
    const companyName = formData.get("companyName") as string;
    const hasISO27001 = formData.get("hasISO27001") === "true";
    const iso27001ExpiryDate = formData.get("iso27001ExpiryDate") as string;
    const usesSSO = formData.get("usesSSO") === "true";
    const usesMFA = formData.get("usesMFA") === "true";
    const individualAccounts = formData.get("individualAccounts") === "true";
    const roleBasedAccess = formData.get("roleBasedAccess") === "true";
    const additionalNotes = formData.get("additionalNotes") as string;
    
    // Handle file upload of ISO27001 cert 
    let isoCertFilePath: string | null = null;
    
    if (hasISO27001) {
      const iso27001File = formData.get("iso27001File") as File;
      
      if (iso27001File && iso27001File.size > 0) {
        try {
          isoCertFilePath = await uploadISO27001Certificate(iso27001File, companyName);
        } catch (error) {
          console.error('ISO-27001 certificate upload failed:', error);
          throw new Error('Failed to upload ISO-27001 certificate');
        }
      }
    }
    
    // Create or find vendor first
    let vendor = await prisma.vendor.findFirst({
      where: { name: companyName }
    });
    
    if (!vendor) {
      vendor = await prisma.vendor.create({
        data: {
          name: companyName,
          status: "ACTIVE"
        }
      });
    }
    
    // Create vendor review with all the form data
    const vendorReview = await prisma.vendorReview.create({
      data: {
        vendorId: vendor.id,
        
        // Company details
        companyName: companyName,
        companyIndustry: null, // remove for now
        
        // Review stuff
        status: "COMPLETED",
        lastReviewDate: new Date(),
        nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        reviewNotes: additionalNotes,
        
        // ISO-27001 cert stuff
        hasISO27001: hasISO27001,
        isoCertUrl: isoCertFilePath,
        isoCertExpiryDate: iso27001ExpiryDate ? new Date(iso27001ExpiryDate) : null,
        
        // NIS2 compliance stuff
        usesSSO: usesSSO,
        usesMFA: usesMFA,
        individualAccounts: individualAccounts,
        roleBasedAccess: roleBasedAccess,
      }
    });
    
    //calculate risk score (CUSTOMISE LATER)
    let riskScore = 100; // Start with perfect score
    
    if (!hasISO27001) riskScore -= 20;
    if (!usesSSO) riskScore -= 15;
    if (!usesMFA) riskScore -= 15;
    if (!individualAccounts) riskScore -= 10;
    if (!roleBasedAccess) riskScore -= 10;
    

    // Update the review with calculated score (CUSTOMISE LATER and use the update more)
    await prisma.vendorReview.update({
      where: { id: vendorReview.id },
      data: { riskScore: Math.max(0, riskScore) }
    });
    
    revalidatePath('/admin/vendors');

    
    return { success: true, vendorId: vendor.id };
    
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Failed to submit form');
  }
}
    

