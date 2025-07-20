import { createClient } from "@/utils/supabase/server";

interface UploadFileParams {
  file: File;
  vendorName: string;
  fileType: string; 
  bucketName?: string; 
}

export async function uploadFile({
  file,
  vendorName,
  fileType,
  bucketName = 'vendor-uploads'//default bucket name
}: UploadFileParams): Promise<string | null> {
  try {
    const supabase = await createClient();
    
    if (!file || file.size === 0) {
      return null;
    }
    
    // Generate file name w timestamp
    const fileExtension = file.name.split('.').pop();
    const fileName = `${fileType}-${Date.now()}.${fileExtension}`;
    
    // Create folders for vendor name (need better way to do this later)
    const sanitizedVendorName = vendorName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const filePath = `${sanitizedVendorName}/${fileName}`;
    
    // Upload file to Supabase storage
    const { error: uploadError } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('File upload error:', uploadError);
      throw new Error(`Failed to upload ${fileType} file`);
    }
    
    // Return the file path instead of public URL
    return filePath;
    
  } catch (error) {
    console.error('Upload helper error:', error);
    throw new Error(`Failed to upload ${fileType} file`);
  }
}

// Helper function for ISO27001 certificates
export async function uploadISO27001Certificate(
  file: File,
  vendorName: string
): Promise<string | null> {
  return uploadFile({
    file,
    vendorName,
    fileType: 'iso27001'
  });
}

// Generic helper for any document
export async function uploadVendorDocument(
  file: File,
  vendorName: string,
  documentType: string
): Promise<string | null> {
  return uploadFile({
    file,
    vendorName,
    fileType: documentType
  });
}

 

export async function getSignedUrl(filePath: string, bucketName: string = 'vendor-uploads') {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.storage.from(bucketName).createSignedUrl(filePath, 3600);
        if (error) throw error;
        return data.signedUrl;
    } catch (error) {
        console.error('Error getting signed URL:', error);
        throw new Error('Failed to get signed URL');
    }
}