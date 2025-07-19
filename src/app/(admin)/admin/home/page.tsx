import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Users, AlertTriangle, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function HomePage() {
  return (
    
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No vendors yet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              0% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Vendors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">0</div>
            <p className="text-xs text-muted-foreground">
              No high risk vendors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No reviews pending
            </p>
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
              <div className="text-3xl font-bold text-destructive">0</div>
              <div className="text-sm text-muted-foreground">High Risk</div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-600">0</div>
              <div className="text-sm text-muted-foreground">Medium Risk</div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-sm text-muted-foreground">Low Risk</div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Assessments */}
        <Card>
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
        </Card>

        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reviews</CardTitle>
            <CardDescription>
              Reviews due in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reviews due</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
