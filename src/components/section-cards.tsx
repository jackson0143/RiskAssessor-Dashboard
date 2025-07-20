
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Lock } from "lucide-react"

interface VendorStatsProps {
  overallRiskRating: 'Low' | 'Medium' | 'High';
  impactLevel: 'Low' | 'Medium' | 'High';
  securityMaturityLevel: 'Low' | 'Medium' | 'High';
}

export function SectionCards({ 
  overallRiskRating = 'Medium',
  impactLevel = 'Medium',
  securityMaturityLevel = 'Medium'
}: VendorStatsProps) {
  
  const getRiskColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low': return '#10b981'; // Green
      case 'Medium': return '#f59e0b'; // Yellow
      case 'High': return '#ef4444'; // Red
      default: return '#6b7280'; // Gray
    }
  };

  const getRiskBadgeVariant = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low': return 'default';
      case 'Medium': return 'secondary';
      case 'High': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Overall Risk Rating
          </CardDescription>
          <CardTitle 
            className="text-2xl font-semibold"
            style={{ color: getRiskColor(overallRiskRating) }}
          >
            {overallRiskRating}
          </CardTitle>
          <CardAction>
            <Badge variant={getRiskBadgeVariant(overallRiskRating)}>
              {overallRiskRating} Risk
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comprehensive risk assessment
          </div>
          <div className="text-muted-foreground">
            Based on impact and maturity levels
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Impact Level
          </CardDescription>
          <CardTitle 
            className="text-2xl font-semibold"
            style={{ color: getRiskColor(impactLevel) }}
          >
            {impactLevel}
          </CardTitle>
          <CardAction>
            <Badge variant={getRiskBadgeVariant(impactLevel)}>
              {impactLevel} Impact
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Business impact assessment
          </div>
          <div className="text-muted-foreground">
            Access to confidential information
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security Maturity Level
          </CardDescription>
          <CardTitle 
            className="text-2xl font-semibold"
            style={{ color: getRiskColor(securityMaturityLevel) }}
          >
            {securityMaturityLevel}
          </CardTitle>
          <CardAction>
            <Badge variant={getRiskBadgeVariant(securityMaturityLevel)}>
              {securityMaturityLevel} Maturity
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Security control assessment
          </div>
          <div className="text-muted-foreground">
            Certifications and security measures
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}