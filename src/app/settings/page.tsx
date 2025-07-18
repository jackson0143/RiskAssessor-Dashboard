import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User, Globe } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 max-w-4x1 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500">
            Manage your account and system preferences
          </p>
        </div>
        <Link href="">
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="management"
            className="flex items-center space-x-1"
          >
            <User className="h-4 w-4" />
            <span>Management</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-1">
            <Globe className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="hover:shadow-md w-fit">
            <CardHeader className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and account details
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1 font-semibold text-sm">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input id="userName" />
                </div>
                <div className="flex flex-col space-y-1 font-semibold text-sm">
                  <Label htmlFor="userName">Email Address</Label>
                  <Input id="userEmail"></Input>
                </div>
              </div>

              <Separator className="bg-slate-300 my-6 h-[1px]" />

              <div>
                <h3>Change Password</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your password to keep your account secure
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1 font-semibold text-sm">
                    <Label htmlFor="currentPassword">Current Password </Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="flex flex-col space-y-1 font-semibold text-sm">
                    <Label htmlFor="newPassword">New Password </Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="flex flex-col space-y-1 font-semibold text-sm">
                    <Label htmlFor="confirmPassword">Confirm Password </Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management">
          <Card className="hover:shadow-md w-fit">
            <CardHeader className="flex flex-col items-start">
              <div>
                <CardTitle className="text-lg">Team Management</CardTitle>
                <CardDescription>Manage access for your team</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead className="w-[242px]">Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="font-medium">Example</TableCell>
                      <TableCell>example123@gmail.com</TableCell>
                      <TableCell>Admin/Member</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <div className="hover:text-red-400">Remove</div>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <PlusCircle /> Add New User
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="hover:shadow-md">
            <CardHeader className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">System Preferences</CardTitle>
                <CardDescription>
                  Configure system-wide settings and defaults
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
