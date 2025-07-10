import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getVendorById } from "@/app/search/actions"
import { Badge } from "@/components/ui/badge"

interface VendorDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  // Await params before accessing its properties
  const { id } = await params
  
  // Fetch vendor data
  const { success, vendor } = await getVendorById(id)
  
  if (!success || !vendor) {
    return (
      <div className="p-6 w-full">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/search">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Vendor Not Found</h1>
          <p className="text-gray-600">The vendor youre looking for doesnt exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 w-full">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/search">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{vendor.name || 'Unnamed Vendor'}</h1>
          <p className="text-gray-600">Vendor Details</p>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg">{vendor.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{vendor.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-lg">{vendor.phone_no}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-lg">{vendor.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Vendor ID</label>
              <p className="text-lg font-mono text-sm">{vendor.id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Industry</label>
              <p className="text-lg">{vendor.industry || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Website</label>
              <p className="text-lg">
                {vendor.website ? (
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {vendor.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>

            {/* Risk Score */}
            <div>
              <label className="text-sm font-medium text-gray-500">Risk Score</label>
              <div className="mt-1">
                <Badge className={`px-2 py-1 text-sm rounded ${
                  vendor.riskScore >= 80 ? 'bg-green-100 text-green-800' :
                  vendor.riskScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {vendor.riskScore}/100
                </Badge>
              </div>
            </div>


            {/* Created Date */}
            <div>
              <label className="text-sm font-medium text-gray-500">Created</label>
              <p className="text-lg">{new Date(vendor.createdAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>




      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <Button>Edit Vendor</Button>
        <Button variant="outline">Download Information</Button>
        {/* <Button variant="destructive">Delete Vendor</Button> */}
      </div>
    </div>
  )
}