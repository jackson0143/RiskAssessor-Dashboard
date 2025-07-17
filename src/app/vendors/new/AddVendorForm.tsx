'use client';

import { useState } from 'react';
import { addVendor } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, ArrowLeft, Send, User, Building2 } from 'lucide-react';
import Link from 'next/link';

//NEED TO ADD AUTH TO THIS IN THE FUTURE
//TODO, use the zod schema to validate form (check shadcn docs for react form part)
//check notifications (toast) and also alerts after submit
export default function AddVendorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone_no: '',
    industry: '',
    website: '',
    description: '',
    owner: {
      name: '',
      email: '',
      role: '',
      department: ''
    },
    primaryContact: {
      name: '',
      email: '',
      phone: ''
    },
    secondaryContact: {
      name: '',
      email: '',
      phone: ''
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
        email: formData.email,
        address: formData.address,
        phone_no: formData.phone_no,
        industry: formData.industry || undefined,
        website: formData.website || undefined
      });
      
      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          address: '',
          phone_no: '',
          industry: '',
          website: '',
          description: '',

          owner: {
            name: '',
            email: '',
            role: '',
            department: ''
          },
          primaryContact: {
            name: '',
            email: '',
            phone: ''
          },
          secondaryContact: {
            name: '',
            email: '',
            phone: ''
          }
        });
        window.location.reload();
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

  const handleOwnerChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      owner: {
        ...prev.owner,
        [field]: value
      }
    }));
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
          <Link href="/vendors">
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
          <form onSubmit={handleSubmit} className="space-y-6 ">
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
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  placeholder="Enter industry"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_no">Phone Number *</Label>
                <Input
                  type="tel"
                  id="phone_no"
                  value={formData.phone_no}
                  onChange={(e) => handleChange('phone_no', e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter vendor address"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="Enter website URL (optional)"
                />
              </div>
                             <div className="space-y-2">
                 <Label htmlFor="description">Description</Label>
                 <Input
                   id="description"
                   value={formData.description}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value)}
                   placeholder="Brief description of vendor services and business relationship"
                 />
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Owner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Vendor Owner (Internal)</span>
            </CardTitle>
            <CardDescription>
              Internal employee responsible for managing this vendor relationship.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.owner.name}
                  onChange={(e) => handleOwnerChange('name', e.target.value)}
                  placeholder="Internal vendor owner"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Owner Email *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.owner.email}
                  onChange={(e) => handleOwnerChange('email', e.target.value)}
                  placeholder="owner@company.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerRole">Role *</Label>
                <Input
                  id="ownerRole"
                  value={formData.owner.role}
                  onChange={(e) => handleOwnerChange('role', e.target.value)}
                  placeholder=""
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerDepartment">Department *</Label>
                <Input
                  id="ownerDepartment"
                  value={formData.owner.department}
                  onChange={(e) => handleOwnerChange('department', e.target.value)}
                  placeholder=""
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Contact (Vendor)</CardTitle>
            <CardDescription>Main point of contact at the vendor organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent >
            <div className="flex items-center space-x-2 mb-2">
              <Send className="h-4 w-4 text-primary" />
              <h4>Automatic Risk Assessment</h4>
            </div>
                         <p className="text-sm text-muted-foreground">
               After adding this vendor, a risk assessment questionnaire will be automatically sent to the primary contact (and secondary contact if provided). 
               The vendor&apos;s risk level will be calculated based on their responses using our impact vs security maturity matrix.
             </p>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Link href="/vendors">
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