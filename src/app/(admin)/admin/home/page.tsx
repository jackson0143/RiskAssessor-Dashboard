import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Users, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Allnex Risk Assessor
        </h1>
        <p className="text-muted-foreground">
          Manage your vendor risk assessments and security compliance.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-4 pb-2">
            <CardTitle className="text-sm">Active Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl">10</div>
            <p className="text-sm text-muted-foreground">20 total vendors</p>
          </CardContent>
        </Card>

        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Assessment Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl">90%</div>
            <Progress value={90} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-1">
              [completedAssessments] of [numberOfVendors] completed
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Vendor Risk Distribution</CardTitle>
          <CardDescription>
            Risk levels across active vendors only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl text-destructive">2</div>
              <div className="text-muted-foreground">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-yellow-600">7</div>
              <div className="text-muted-foreground">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-green-600">1</div>
              <div className="text-muted-foreground">Low Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Assessments</CardTitle>
            <CardDescription>
              Vendors awaiting risk assessment completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* {pendingAssessments.length === 0 ? (
              <p className="text-muted-foreground">All vendors have completed assessments</p>
            ) : ( */}
            <div className="space-y-3">
              {/* {pendingAssessments.slice(0, 5).map((vendor) => ( */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                {" "}
                {/* key */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4>Vendor Name</h4>
                    {/* <Badge fontVariant="secondary">
                          Vendor Status
                        </Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Assessment pending
                    {/* {vendor.questionnaireSent ? 'Questionnaire sent' : 'Assessment pending'} */}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => onViewVendor(vendor.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
              {/* ))} */}
            </div>
            {/* )} */}
          </CardContent>
        </Card>

        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reviews</CardTitle>
            <CardDescription>
              Active vendor reviews due in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* {upcomingReviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews due in the next 30 days</p>
            ) : ( */}
            <div className="space-y-3">
              {/* {upcomingReviews.slice(0, 5).map((vendor) => ( */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                {" "}
                {/* key */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4>Vendor Name</h4>
                    {/* <Badge variant={getRiskBadgeVariant(vendor.riskLevel)}>
                          {vendor.riskLevel}
                        </Badge> */}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Due: [DATE]
                    {/* Due: {vendor.nextReview ? new Date(vendor.nextReview).toLocaleDateString() : 'Not scheduled'} */}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => onViewVendor(vendor.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
              {/* ))} */}
            </div>
            {/* )} */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
