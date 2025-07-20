
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
  overallRiskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'N/A';
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'N/A';
  securityMaturityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'N/A';
}

export function SectionCards({ 
  overallRiskRating = 'N/A',
  impactLevel = 'N/A',
  securityMaturityLevel = 'N/A'
}: VendorStatsProps) {
  
  const getRiskcolour = (level: 'LOW' | 'MEDIUM' | 'HIGH' | 'N/A') => {
    switch (level) {
      case 'LOW': return '#10b981'; // Green
      case 'MEDIUM': return '#f59e0b'; // Yellow
      case 'HIGH': return '#ef4444'; // Red
      case 'N/A': return '#6b7280'; // Gray
      default: return '#6b7280'; // Gray
    }
  };

  const getMaturitycolour = (level: 'LOW' | 'MEDIUM' | 'HIGH' | 'N/A') => {
    switch (level) {
      case 'LOW': return '#ef4444'; // Red
      case 'MEDIUM': return '#f59e0b'; // Yellow
      case 'HIGH': return '#10b981'; // Green
      case 'N/A': return '#6b7280'; // Gray
      default: return '#6b7280'; // Gray
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
            style={{ color: getRiskcolour(overallRiskRating) }}
          >
            {overallRiskRating}
          </CardTitle>
          <CardAction>
            <Badge style={{ backgroundColor: getRiskcolour(overallRiskRating), color: 'white' }}>
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
            style={{ color: getRiskcolour(impactLevel) }}
          >
            {impactLevel}
          </CardTitle>
          <CardAction>
            <Badge style={{ backgroundColor: getRiskcolour(impactLevel), color: 'white' }}>
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
            style={{ color: getMaturitycolour(securityMaturityLevel) }}
          >
            {securityMaturityLevel}
          </CardTitle>
          <CardAction>
            <Badge style={{ backgroundColor: getMaturitycolour(securityMaturityLevel), color: 'white' }}>
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