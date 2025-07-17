import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    email: string;
    address: string;
    phone_no: string;
    industry: string | null;
    website: string | null;
    riskScore: number;
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="shadow-none rounded-md">
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle className="text-lg">{vendor.name}</CardTitle>
          <p className="text-gray-500 text-sm">{vendor.email}</p>
          <p className="text-gray-400 text-xs">{vendor.phone_no}</p>
 
          <div className="flex gap-4 mt-2">
            <Badge variant="secondary">{vendor.industry || 'N/A'}</Badge>
            <Badge variant="outline" className={getRiskColor(vendor.riskScore)}>
              Risk score: {vendor.riskScore}/100
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/vendors/${vendor.id}`}>
            <Button variant="ghost">View</Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  )
}