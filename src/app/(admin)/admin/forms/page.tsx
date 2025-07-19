"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Building, Shield, FileText, CheckCircle } from "lucide-react";
import { createForm } from "./actions";
import { useRouter } from "next/navigation";

interface FormData {
  // Company Details
  companyName: string;
  industry: string;
  
  // ISO-27001 Certificate
  hasISO27001: boolean;
  iso27001File: File | null;
  iso27001ExpiryDate: string;
  
  // NIS2 Compliance
  usesSSO: boolean;
  usesMFA: boolean;
  individualAccounts: boolean;
  roleBasedAccess: boolean;
  
  // Additional Notes
  additionalNotes: string;
}

export default function FormsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    hasISO27001: false,
    iso27001File: null,
    iso27001ExpiryDate: "",
    usesSSO: false,
    usesMFA: false,
    individualAccounts: false,
    roleBasedAccess: false,
    additionalNotes: "",
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      iso27001File: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("companyName", formData.companyName);
    formDataToSubmit.append("industry", formData.industry);
    formDataToSubmit.append("hasISO27001", formData.hasISO27001.toString());
    formDataToSubmit.append("iso27001ExpiryDate", formData.iso27001ExpiryDate);
    formDataToSubmit.append("usesSSO", formData.usesSSO.toString());
    formDataToSubmit.append("usesMFA", formData.usesMFA.toString());
    formDataToSubmit.append("individualAccounts", formData.individualAccounts.toString());
    formDataToSubmit.append("roleBasedAccess", formData.roleBasedAccess.toString());
    formDataToSubmit.append("additionalNotes", formData.additionalNotes);
    
    if (formData.iso27001File) {
      formDataToSubmit.append("iso27001File", formData.iso27001File);
    }
    
    try {
      await createForm(formDataToSubmit);

      router.push('/admin/vendors');
    } catch (error) {
      console.error('Form submission error:', error);
      // You can add error handling UI here
    }
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Government",
    "Non-profit",
    "Other"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vendor Security Assessment Form</h1>
        <p className="text-gray-600">
          Please complete this security assessment form to help us evaluate your organization&apos;s security.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter your company name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ISO-27001 Certificate Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              ISO-27001 Certification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasISO27001"
                checked={formData.hasISO27001}
                                 onCheckedChange={(checked: boolean) => handleInputChange("hasISO27001", checked)}
              />
              <Label htmlFor="hasISO27001" className="text-base font-medium">
                Do you have an ISO-27001 certificate?
              </Label>
            </div>

            {formData.hasISO27001 && (
              <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="iso27001ExpiryDate">Certificate Expiry Date</Label>
                  <Input
                    id="iso27001ExpiryDate"
                    type="date"
                    value={formData.iso27001ExpiryDate}
                    onChange={(e) => handleInputChange("iso27001ExpiryDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iso27001File">Upload ISO-27001 Certificate</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <input
                      id="iso27001File"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="iso27001File" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-800 font-medium">
                        Click to upload
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF, JPG, JPEG, PNG up to 10MB
                    </p>
                    {formData.iso27001File && (
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          {formData.iso27001File.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* NIS2 Compliance Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              NIS2 Compliance Requirements
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">NIS2 Directive</Badge>
              <span className="text-sm text-gray-600">
                Based on Network and Information Security 2 compliance requirements
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usesSSO"
                  checked={formData.usesSSO}
                                   onCheckedChange={(checked: boolean) => handleInputChange("usesSSO", checked)}
               />
               <Label htmlFor="usesSSO" className="text-base">
                 Do you use Single Sign-On (SSO)?
               </Label>
             </div>

             <div className="flex items-center space-x-2">
               <Checkbox
                 id="usesMFA"
                 checked={formData.usesMFA}
                 onCheckedChange={(checked: boolean) => handleInputChange("usesMFA", checked)}
               />
               <Label htmlFor="usesMFA" className="text-base">
                 Do you use Multi-Factor Authentication (MFA)?
               </Label>
             </div>

             <div className="flex items-center space-x-2">
               <Checkbox
                 id="individualAccounts"
                 checked={formData.individualAccounts}
                 onCheckedChange={(checked: boolean) => handleInputChange("individualAccounts", checked)}
               />
               <Label htmlFor="individualAccounts" className="text-base">
                 Are you using individual accounts (no sharing of same account)?
               </Label>
             </div>

             <div className="flex items-center space-x-2">
               <Checkbox
                 id="roleBasedAccess"
                 checked={formData.roleBasedAccess}
                 onCheckedChange={(checked: boolean) => handleInputChange("roleBasedAccess", checked)}
               />
               <Label htmlFor="roleBasedAccess" className="text-base">
                 Do you enforce role-based access controls (or equivalent) on all critical systems?
               </Label>
             </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Information</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("additionalNotes", e.target.value)}
                placeholder="Please provide any additional information about your security practices, certifications, or compliance measures..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-8">
            Submit Assessment
          </Button>
        </div>
      </form>
    </div>
  );
}