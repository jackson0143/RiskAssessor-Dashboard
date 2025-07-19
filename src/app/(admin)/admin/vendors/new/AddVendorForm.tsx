'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addVendor } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircleIcon, ArrowLeft, Send,  Building2 } from 'lucide-react';
import Link from 'next/link';

//NEED TO ADD AUTH TO THIS IN THE FUTURE
//TODO, use the zod schema to validate form (check shadcn docs for react form part)
//check notifications (toast) and also alerts after submit
export default function AddVendorForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    website: '',
    securityMaturity: '',
    impact: '',
    category: '',
    description: '',
    status: 'PENDING' as 'ACTIVE' | 'INACTIVE' | 'PENDING',
    primaryContact: {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: ''
    },
    secondaryContact: {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await addVendor({
        name: formData.name,
        ownerName: formData.ownerName || undefined,
        website: formData.website || undefined,
        securityMaturity: formData.securityMaturity || undefined,
        impact: formData.impact || undefined,
        category: formData.category || undefined,
        description: formData.description || undefined,
        status: formData.status,
        primaryContact: formData.primaryContact,
        secondaryContact: formData.secondaryContact
      });
      
      if (result.success) {
        // Redirect to vendors page
        router.push('/admin/vendors');
      } else {
        setError('Failed to create vendor. Please try again.');
      }
    } catch {
      setError('An error occurred while creating the vendor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (contactType: 'primaryContact' | 'secondaryContact', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [contactType]: {
        ...prev[contactType],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/admin/vendors">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add New Vendor</h1>
          <p className="text-muted-foreground">
            Register a new vendor and send risk assessment questionnaire
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Provide basic vendor details and business relationship information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vendor Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter vendor name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    placeholder="Enter owner name"
                  />
                </div>
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="Enter category"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    type="url"
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description of vendor services and business relationship"
                />
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}


          {/* Primary Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Contact (Vendor)</CardTitle>
              <CardDescription>Main point of contact at the vendor organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryName">Full Name *</Label>
                  <Input
                    id="primaryName"
                    value={formData.primaryContact.name}
                    onChange={(e) => handleContactChange('primaryContact', 'name', e.target.value)}
                    placeholder="Primary contact name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryEmail">Email *</Label>
                  <Input
                    id="primaryEmail"
                    type="email"
                    value={formData.primaryContact.email}
                    onChange={(e) => handleContactChange('primaryContact', 'email', e.target.value)}
                    placeholder="primary@vendor.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryPhone">Phone</Label>
                  <Input
                    id="primaryPhone"
                    value={formData.primaryContact.phone}
                    onChange={(e) => handleContactChange('primaryContact', 'phone', e.target.value)}
                    placeholder="0000000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryRole">Role</Label>
                  <Input
                    id="primaryRole"
                    value={formData.primaryContact.role}
                    onChange={(e) => handleContactChange('primaryContact', 'role', e.target.value)}
                    placeholder="Enter role"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryDepartment">Department</Label>
                  <Input
                    id="primaryDepartment"
                    value={formData.primaryContact.department}
                    onChange={(e) => handleContactChange('primaryContact', 'department', e.target.value)}
                    placeholder="Enter department"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Secondary Contact (Vendor)</CardTitle>
              <CardDescription>Alternative contact at the vendor organization (optional but recommended).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondaryName">Full Name</Label>
                  <Input
                    id="secondaryName"
                    value={formData.secondaryContact.name}
                    onChange={(e) => handleContactChange('secondaryContact', 'name', e.target.value)}
                    placeholder="Secondary contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryEmail">Email</Label>
                  <Input
                    id="secondaryEmail"
                    type="email"
                    value={formData.secondaryContact.email}
                    onChange={(e) => handleContactChange('secondaryContact', 'email', e.target.value)}
                    placeholder="secondary@vendor.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryPhone">Phone</Label>
                  <Input
                    id="secondaryPhone"
                    value={formData.secondaryContact.phone}
                    onChange={(e) => handleContactChange('secondaryContact', 'phone', e.target.value)}
                    placeholder="0000000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryRole">Role</Label>
                  <Input
                    id="secondaryRole"
                    value={formData.secondaryContact.role}
                    onChange={(e) => handleContactChange('secondaryContact', 'role', e.target.value)}
                    placeholder="Enter role"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryDepartment">Department</Label>
                  <Input
                    id="secondaryDepartment"
                    value={formData.secondaryContact.department}
                    onChange={(e) => handleContactChange('secondaryContact', 'department', e.target.value)}
                    placeholder="Enter department"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Link href="/admin/vendors">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Send className="h-4 w-4 mr-2 animate-spin" />
                  Adding Vendor...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Add Vendor & Send Assessment
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 