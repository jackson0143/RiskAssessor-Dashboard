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
  return (
    <Card className="hover:shadow-md transition-shadow bg-slate-50/80 dark:bg-neutral-900">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">{vendor.name}</CardTitle>
          <p className="text-gray-600 text-sm">{vendor.email}</p>
          <p className="text-gray-500 text-xs">{vendor.phone_no}</p>
 
          <div className="flex gap-4 mt-2">
            <Badge variant="secondary" className="px-2 py-1 text-sm rounded">{vendor.industry || 'N/A'}</Badge>
           <Badge variant="outline" className={`px-2 py-1 text-sm rounded ${
                  vendor.riskScore >= 80 ? 'bg-green-100 text-green-800' :
                  vendor.riskScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>Risk score: {vendor.riskScore}/100</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/vendors/${vendor.id}`}>
            <Button variant="ghost" size="default">View</Button>
          </Link>
          {/* <Button variant="ghost" size="sm">Edit</Button> */}
        </div>
      </CardHeader>
    </Card>
  )
}