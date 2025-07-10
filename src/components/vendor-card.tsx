import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface VendorCardProps {
  vendor: {
    id: number;
    name: string | null;
    email: string;
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">{vendor.name || 'Unnamed Vendor'}</CardTitle>
          <p className="text-gray-600 text-sm">{vendor.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Vendor</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">View</Button>
          <Button variant="ghost" size="sm">Edit</Button>
        </div>
      </CardHeader>
    </Card>
  )
}