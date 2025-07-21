"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client';
import { uploadISO27001Certificate, getSignedUrl } from "@/lib/upload-helpers";

const prisma = new PrismaClient();

//MATURITY RATING
function getMaturityRating(securityFields: {
  hasISO27001: boolean;
  performsVulnerabilityScan: boolean;
  usesMFA: boolean;
  usesAutomatedAccessControl: boolean;
  maintainsIncidentResponsePlan: boolean;
}): { score: number; rating: 'LOW' | 'MEDIUM' | 'HIGH' } {
  let score = 100; // Start with 100
  

  if (!securityFields.hasISO27001) score -= 20; // ISO27001 subtracts 20
  if (!securityFields.performsVulnerabilityScan) score -= 5;
  if (!securityFields.usesMFA) score -= 5;
  if (!securityFields.usesAutomatedAccessControl) score -= 5;
  if (!securityFields.maintainsIncidentResponsePlan) score -= 5;
  

  score = Math.max(0, score);
  

  let rating: 'LOW' | 'MEDIUM' | 'HIGH';
  if (score > 80) {
    rating = 'HIGH';
  } else if (score >= 60) {
    rating = 'MEDIUM';
  } else {
    rating = 'LOW';
  }
  
  return { score: Math.round(score), rating };
}


function getImpactRating(impactFields: {
  requireOperationData: boolean;
  requireFinancialData: boolean;
  requirePersonalData: boolean;
  canCauseBusinessOutage: boolean;
  roleBasedAccess: boolean;
}): { score: number; rating: 'LOW' | 'MEDIUM' | 'HIGH' } {
  let score = 100;
  
  if (impactFields.requireOperationData) score -= 20;
  if (impactFields.requireFinancialData) score -= 20;
  if (impactFields.requirePersonalData) score -= 20;
  if (impactFields.canCauseBusinessOutage) score -= 20;
  if (!impactFields.roleBasedAccess) score -= 20;
  
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
    const performsVulnerabilityScan = formData.get("performsVulnerabilityScan") === "true";
    const usesMFA = formData.get("usesMFA") === "true";
    const usesAutomatedAccessControl = formData.get("usesAutomatedAccessControl") === "true";
    const maintainsIncidentResponsePlan = formData.get("maintainsIncidentResponsePlan") === "true";
    const additionalNotesMaturity = formData.get("additionalNotesMaturity") as string;
    const requireOperationData = formData.get("requireOperationData") === "true";
    const requireFinancialData = formData.get("requireFinancialData") === "true";
    const requirePersonalData = formData.get("requirePersonalData") === "true";
    const canCauseBusinessOutage = formData.get("canCauseBusinessOutage") === "true";
    const roleBasedAccess = formData.get("roleBasedAccess") === "true";
    const additionalNotesImpact = formData.get("additionalNotesImpact") as string;

    if (!companyName || !companyName.trim()) {
      return { success: false, message: 'Please select a vendor name' };
    }
    

    if (hasISO27001) {
      const iso27001File = formData.get("iso27001File") as File;
      if (!iso27001File || iso27001File.size === 0) {
        return { success: false, message: 'Please upload your ISO-27001 certificate' };
      }
    }
    

    if (hasISO27001 && !iso27001ExpiryDate) {
      return { success: false, message: 'Please provide the certificate expiry date' };
    }
    

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
      performsVulnerabilityScan,
      usesMFA,
      usesAutomatedAccessControl,
      maintainsIncidentResponsePlan
    });

    // calculate impact rating
    const impactResult = getImpactRating({
      requireOperationData,
      requireFinancialData,
      requirePersonalData,
      canCauseBusinessOutage,
      roleBasedAccess
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
        requireOperationData: requireOperationData,
        requireFinancialData: requireFinancialData,
        requirePersonalData: requirePersonalData,
        canCauseBusinessOutage: canCauseBusinessOutage,
        roleBasedAccess: roleBasedAccess,
        
        // Security Maturity stuff
        performsVulnerabilityScan: performsVulnerabilityScan,
        usesMFA: usesMFA,
        usesAutomatedAccessControl: usesAutomatedAccessControl,
        maintainsIncidentResponsePlan: maintainsIncidentResponsePlan,
        

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

    return { success: true, message: 'Assessment submitted successfully', vendorId: vendor.id };
    
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: 'Failed to submit form. Please try again.' };
  }
}
    

