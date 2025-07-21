"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client';
import { uploadISO27001Certificate, getSignedUrl } from "@/lib/upload-helpers";

const prisma = new PrismaClient();

//MATURITY RATING
function getMaturityRating(securityFields: {
  hasISO27001: boolean;
  usesSSO: boolean;
  usesMFA: boolean;
  individualAccounts: boolean;
  roleBasedAccess: boolean;
  formalManagementSystem: boolean;
}): { score: number; rating: 'LOW' | 'MEDIUM' | 'HIGH' } {
  let score = 100; // Start with 100
  

  if (!securityFields.hasISO27001) score -= 20; // ISO27001 subtracts 20
  if (!securityFields.usesSSO) score -= 5;
  if (!securityFields.usesMFA) score -= 5;
  if (!securityFields.individualAccounts) score -= 5;
  if (!securityFields.roleBasedAccess) score -= 5;
  if (!securityFields.formalManagementSystem) score -= 5;
  

  score = Math.max(0, score);
  

  let rating: 'LOW' | 'MEDIUM' | 'HIGH';
  if (score > 80) {
    rating = 'HIGH';
  } else if (score >= 50) {
    rating = 'MEDIUM';
  } else {
    rating = 'LOW';
  }
  
  return { score: Math.round(score), rating };
}


function getImpactRating(impactFields: {
  requirePersonalData: boolean;
  requireSystemAccess: boolean;
}): { score: number; rating: 'LOW' | 'MEDIUM' | 'HIGH' } {
  let score = 100;
  
  if (impactFields.requirePersonalData) score -= 20;
  if (impactFields.requireSystemAccess) score -= 20;
  
  score = Math.max(0, score);
  
  let rating: 'LOW' | 'MEDIUM' | 'HIGH';
  if (score > 80) {
    rating = 'LOW'; 
  } else if (score > 60) {
    rating = 'MEDIUM'; 
  } else {
    rating = 'HIGH'; 
  }
  
  return { score: Math.round(score), rating };
}

//RISK RATING
function getRiskRating(impactRating: 'LOW' | 'MEDIUM' | 'HIGH', maturityRating: 'LOW' | 'MEDIUM' | 'HIGH'): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (impactRating === 'LOW') {
    if (maturityRating === 'HIGH' || maturityRating === 'MEDIUM') return 'LOW';
    return 'MEDIUM';
  }
  if (impactRating === 'MEDIUM') {
    if (maturityRating === 'HIGH') return 'LOW';
    if (maturityRating === 'MEDIUM') return 'MEDIUM';
    return 'HIGH';
  }
  if (impactRating === 'HIGH') {
    if (maturityRating === 'HIGH') return 'MEDIUM';
    return 'HIGH';
  }
  return 'MEDIUM';
}

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
    const companyName = formData.get("companyName") as string;
    const hasISO27001 = formData.get("hasISO27001") === "true";
    const iso27001ExpiryDate = formData.get("iso27001ExpiryDate") as string;
    const usesSSO = formData.get("usesSSO") === "true";
    const usesMFA = formData.get("usesMFA") === "true";
    const individualAccounts = formData.get("individualAccounts") === "true";
    const roleBasedAccess = formData.get("roleBasedAccess") === "true";
    const formalManagementSystem = formData.get("formalManagementSystem") === "true";
    const additionalNotesMaturity = formData.get("additionalNotesMaturity") as string;
    const requirePersonalData = formData.get("requirePersonalData") === "true";
    const requireSystemAccess = formData.get("requireSystemAccess") === "true";
    const additionalNotesImpact = formData.get("additionalNotesImpact") as string;
    
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
    
    // calculate maturity rating
    const maturityResult = getMaturityRating({
      hasISO27001,
      usesSSO,
      usesMFA,
      individualAccounts,
      roleBasedAccess,
      formalManagementSystem
    });

    // calculate impact rating
    const impactResult = getImpactRating({
      requirePersonalData,
      requireSystemAccess
    });

    // calculate overall risk rating
    const riskRating = getRiskRating(impactResult.rating, maturityResult.rating);

    // Create vendor review with all the form data
    await prisma.vendorReview.create({
      data: {
        vendorId: vendor.id,
        
        // Company details
        companyName: companyName,
        status: "COMPLETED",
        lastReviewDate: new Date(),
        nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now

        // File upload ISO27001
        hasISO27001: hasISO27001,
        isoCertUrl: isoCertFilePath,
        isoCertExpiryDate: iso27001ExpiryDate ? new Date(iso27001ExpiryDate) : null,
        

        //impact stuff
        requirePersonalData: requirePersonalData,
        requireSystemAccess: requireSystemAccess,
        
        // Security Maturity stuff
        usesSSO: usesSSO,
        usesMFA: usesMFA,
        individualAccounts: individualAccounts,
        roleBasedAccess: roleBasedAccess,
        formalManagementSystem: formalManagementSystem,
        

        //Additional Info
        additionalNotesMaturity: additionalNotesMaturity,
        additionalNotesImpact: additionalNotesImpact,

        // Calculated scores
        maturityScore: maturityResult.score,
        maturityRating: maturityResult.rating,
        impactScore: impactResult.score,
        impactRating: impactResult.rating,
        riskRating: riskRating,
      }
    });

    await prisma.vendor.update({
      where: { id: vendor.id },
      data: {
        maturityScore: maturityResult.score,
        maturityRating: maturityResult.rating,
        impactScore: impactResult.score,
        impactRating: impactResult.rating,
        riskRating: riskRating,
      }
      
    });

    await prisma.vendor.update({
      where: {
        id: vendor.id,
      },
      data : {
        lastReviewDate: new Date(),
        nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    })
    


    revalidatePath('/admin/vendors');

    
    return { success: true, vendorId: vendor.id };
    
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Failed to submit form');
  }
}
    

