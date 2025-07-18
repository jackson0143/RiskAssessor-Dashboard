import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your user dashboard. Here you can view your assigned tasks and assessments.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Assessments</CardTitle>
            <CardDescription>
              View your assigned vendor assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">
              Pending assessments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>
              Assessments youve completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-muted-foreground">
              Completed assessments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update your profile information and preferences
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 