import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Mail, Phone, AlertTriangle, User, Building } from "lucide-react"
import Link from "next/link"
import { getVendorById } from "../actions"
import { SectionCards } from "@/components/section-cards"

import { getVendorReview } from "../actions"
import { VendorReviewCard } from "@/components/vendor-assessment-card"
import { RiskAssessmentFramework } from "@/components/risk-assessment-framework"

interface VendorDetailPageProps {
  params: Promise<{
    id: string
  }>
}

interface VendorReview {
  id: string;
  vendorId: string;
  status: 'DRAFT' | 'COMPLETED' | 'PENDING' | 'APPROVED';
  lastReviewDate: Date;
  nextReviewDate: Date;
  reviewNotes: string | null;
  companyName: string | null;
  companyIndustry: string | null;
  hasISO27001: boolean;
  isoCertUrl: string | null;
  isoCertExpiryDate: Date | null;
  usesSSO: boolean;
  usesMFA: boolean;
  individualAccounts: boolean;
  roleBasedAccess: boolean;
  riskScore: number | null;
  impactScore: number | null;
  maturityScore: number | null;
  riskRating: string | null;
  maturityRating: string | null;
  impactRating: string | null;
  createdAt: Date;
  updatedAt: Date;
  vendor: {
    id: string;
    name: string;
  };
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  const { id } = await params
  const { success, vendor } = await getVendorById(id)
  const { vendorReviews } = await getVendorReview(id)

  if (!success || !vendor) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/vendors">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Vendors
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Vendor Not Found</h1>
          <p className="text-muted-foreground">The vendor you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  const primaryContact = vendor.contacts.find(contact => contact.type === 'PRIMARY')
  const secondaryContact = vendor.contacts.find(contact => contact.type === 'SECONDARY')

  const getStatusBadgeVariant = (status: 'ACTIVE' | 'INACTIVE' | 'PENDING') => {
    switch (status) {
      case 'ACTIVE': return 'default';
      case 'INACTIVE': return 'secondary';
      case 'PENDING': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 w-full max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/vendors">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Vendors
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{vendor.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={getStatusBadgeVariant(vendor.status)}>
                {vendor.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Edit className="h-4 w-4 mr-1" />
            Edit Vendor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <div className="min-h-[800px] w-full">
          <TabsContent value="overview" className="h-full">
            <div className="space-y-6">
              {/* Risk Assessment Dashboard */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Risk Assessment Overview</h2>
                <SectionCards 
                  overallRiskRating="Medium"
                  impactLevel="Medium"
                  securityMaturityLevel="Medium"
                />
              </div>

              {/* Risk Assessment Framework */}
              <div>
                <RiskAssessmentFramework 
                  impactLevel="Medium"
                  securityMaturity="High"
                  showCurrentAssessment={true}
                />
              </div>
{/* 
        
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-20 gap-6">
                  <div className="lg:col-span-13">
                    <ChartBarMixed />
                  </div>
                  <div className="lg:col-span-7">
                    <div className="h-full min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Additional charts can be added here</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </TabsContent>

          <TabsContent value="about" className="h-full">
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Vendor Name</label>
                        <p className="text-lg">{vendor.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
                        <p className="text-lg">{vendor.ownerName || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Category</label>
                        <p className="text-lg">{vendor.category || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Website</label>
                        <p className="text-lg">
                          {vendor.website ? (
                            <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {vendor.website}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                        <p className="text-lg">{vendor.description || 'No description provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Vendor ID</label>
                        <p className="text-lg font-mono text-sm">{vendor.id}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Primary Contact</CardTitle>
                    <CardDescription>Main point of contact at the vendor organization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {primaryContact ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                          <p className="text-lg">{primaryContact.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${primaryContact.email}`} className="text-primary hover:underline">
                              {primaryContact.email}
                            </a>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{primaryContact.phone || 'Not provided'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Role</label>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{primaryContact.role || 'Not specified'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Department</label>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{primaryContact.department || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No primary contact information available</p>
                    )}
                  </CardContent>
                </Card>

                {/* Secondary Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Secondary Contact</CardTitle>
                    <CardDescription>Alternative contact at the vendor organization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {secondaryContact ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                          <p className="text-lg">{secondaryContact.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${secondaryContact.email}`} className="text-primary hover:underline">
                              {secondaryContact.email}
                            </a>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{secondaryContact.phone || 'Not provided'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Role</label>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{secondaryContact.role || 'Not specified'}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Department</label>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{secondaryContact.department || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No secondary contact information available</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assessment" className="h-full">
            <div className="space-y-6">
              {vendorReviews && vendorReviews.length > 0 ? (
                vendorReviews.map((review: VendorReview, index: number) => (
                  <VendorReviewCard key={review.id} review={review} index={index} />
                ))
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Status</CardTitle>
                    <CardDescription>
                      Track the progress of risk assessment for this vendor
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Assessment Status</label>
                          <div className="mt-1">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              ⏳ Assessment Pending
                            </Badge>
                          </div>
                        </div>
   
                      </div>
                    </div>

                    <Card className="bg-yellow-50 border-yellow-200 mt-4">
                      <CardContent>
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <h4 className="font-semibold">Assessment Required</h4>
                        </div>
                        <p className="text-sm text-yellow-800">
                          This vendor needs to complete their risk assessment questionnaire. 
                          The questionnaire will be sent to their contact email(s). 
                          Risk level and detailed breakdown will be available upon completion.
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}