
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Lock, AlertTriangle } from "lucide-react"

interface VendorStatsProps {
  overallRiskScore: number;
  cyberResilienceRating: number;
  securityControlCompliance: number;
  incidentResponseCapability: number;
}

export function SectionCards({ 
  overallRiskScore = 10,
  cyberResilienceRating = 40,
  securityControlCompliance = 75,
  incidentResponseCapability = 100
}: VendorStatsProps) {
  
  const getRiskColor = (score: number) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 60) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card >
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Overall Risk Score
          </CardDescription>
          <CardTitle 
            className="text-3xl font-semibold tabular-nums @[250px]/card:text-3xl"
            style={{ color: getRiskColor(overallRiskScore) }}
          >
            {overallRiskScore}/100
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {getRiskLabel(overallRiskScore)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comprehensive risk assessment
          </div>
          <div className="text-muted-foreground">
            Based on all security metrics
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4" />
            Cyber Resilience Rating
          </CardDescription>
          <CardTitle 
            className="text-lg font-semibold tabular-nums"
            style={{ color: getRiskColor(cyberResilienceRating) }}
          >
            {cyberResilienceRating}/100
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs">
              {getRiskLabel(cyberResilienceRating)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong cyber defense posture
          </div>
          <div className="text-muted-foreground">
            Recovery and adaptation capability
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-sm">
            <Lock className="h-4 w-4" />
            Security Control Compliance
          </CardDescription>
          <CardTitle 
            className="text-lg font-semibold tabular-nums"
            style={{ color: getRiskColor(securityControlCompliance) }}
          >
            {securityControlCompliance}/100
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs">
              {getRiskLabel(securityControlCompliance)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Needs improvement in controls
          </div>
          <div className="text-muted-foreground">
            Policy and procedure adherence
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4" />
            Incident Response Capability
          </CardDescription>
          <CardTitle 
            className="text-lg font-semibold tabular-nums"
            style={{ color: getRiskColor(incidentResponseCapability) }}
          >
            {incidentResponseCapability}/100
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs">
              {getRiskLabel(incidentResponseCapability)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-xs">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Excellent response readiness
          </div>
          <div className="text-muted-foreground">
            Quick detection and resolution
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}