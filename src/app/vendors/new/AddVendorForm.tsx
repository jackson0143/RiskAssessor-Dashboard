'use client';

import { useState } from 'react';

import { addVendor } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from 'lucide-react'

//NEED TO ADD AUTH TO THIS IN THE FUTURE
//TODO, use the zod schema to validate form (check shadcn docs for react form part)
//check notifications (toast) and also alerts after submit
export default function AddVendorForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await addVendor({
        name,
        email,
        address,
        phone_no,
        industry: industry || undefined,
        website: website || undefined
      });
      
      if (result.success) {
        // Reset form
        setName('');
        setEmail('');
        setAddress('');
        setPhoneNo('');
        setIndustry('');
        setWebsite('');
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

  return (
    <Card className="mb-6 w-full">
      <CardHeader>
        <CardTitle>Add New Vendor</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter vendor name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter vendor address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_no" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phone_no"
              value={phone_no}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              Industry
            </Label>
            <Input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Enter industry (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium">
              Website
            </Label>
            <Input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL (optional)"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding Vendor...' : 'Add Vendor'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 