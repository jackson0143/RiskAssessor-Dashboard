import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Users, AlertTriangle, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getDashboardStats } from "./actions";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const stats = await getDashboardStats();

  const getRiskBadgeVariant = (risk: string | null) => {
    switch (risk) {
      case "HIGH":
        return "destructive";
      case "MEDIUM":
        return "secondary";
      case "LOW":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your vendor risk assessment program
        </p>
      </div>

      {/* Stats Cards */}
      {/*Grid of 4 cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {stats.totalVendors ? (
              <div className="text-2xl font-bold">{stats.totalVendors}</div>
            ) : (
              <>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No vendors yet</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assessments
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">0% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High Risk Vendors
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {stats.highRiskVendorCount ? (
              <>
                <div className="text-2xl font-bold text-destructive">
                  {stats.highRiskVendorCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-destructive">0</div>
                <p className="text-xs text-muted-foreground">
                  No high risk vendors
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Due This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {stats.dueThisMonth ? (
              <>
                <div className="text-2xl font-bold">{stats.dueThisMonth}</div>
                <p className="text-xs text-muted-foreground">Reviews pending</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No reviews pending
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
          <CardDescription>
            Current risk levels across all vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-destructive">
                {stats.highRiskVendorCount}
              </div>
              <div className="text-sm text-muted-foreground">High Risk</div>
              <Progress
                value={
                  (stats.highRiskVendorCount / stats.totalAssessedVendorCount) *
                  100
                }
                className="h-2"
              />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-600">
                {stats.mediumRiskVendorCount}
              </div>
              <div className="text-sm text-muted-foreground">Medium Risk</div>
              <Progress
                value={
                  (stats.mediumRiskVendorCount /
                    stats.totalAssessedVendorCount) *
                  100
                }
                className="h-2"
              />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">
                {stats.lowRiskVendorCount}
              </div>
              <div className="text-sm text-muted-foreground">Low Risk</div>
              <Progress
                value={
                  (stats.lowRiskVendorCount / stats.totalAssessedVendorCount) *
                  100
                }
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-1">
        {/* Pending Assessments */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Pending Assessments</CardTitle>
            <CardDescription>
              Vendors awaiting risk assessment completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">No pending assessments</p>
            </div>
          </CardContent>
        </Card> */}

        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reviews</CardTitle>
            <CardDescription>Reviews due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Will need to add Pagination? */}
            {(await stats.upcomingReviews).length ? (
              <div className="space-y-3">
                {(await stats.upcomingReviews).map((upcomingReview) => (
                  <div
                    key={upcomingReview.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4>{upcomingReview.name}</h4>
                        <Badge
                          variant={getRiskBadgeVariant(
                            upcomingReview.riskRating
                          )}
                        >
                          {upcomingReview.riskRating}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Due:{" "}
                        {upcomingReview.nextReviewDate
                          ? new Date(
                              upcomingReview.nextReviewDate
                            ).toLocaleDateString()
                          : "Not scheduled"}
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No reviews due</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
