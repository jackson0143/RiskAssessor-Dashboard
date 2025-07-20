import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RiskAssessmentFrameworkProps {
  impactLevel?: 'Low' | 'Medium' | 'High';
  securityMaturity?: 'High' | 'Medium' | 'Low';
  showCurrentAssessment?: boolean;
}

export function RiskAssessmentFramework({ 
  impactLevel, 
  securityMaturity, 
  showCurrentAssessment = false 
}: RiskAssessmentFrameworkProps) {
  
  const getRiskLevel = (impact: string, maturity: string) => {
    if (impact === 'Low') {
      if (maturity === 'High' || maturity === 'Medium') return { level: 'Low', color: 'bg-green-100 text-green-800' };
      return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
    }
    if (impact === 'Medium') {
      if (maturity === 'High') return { level: 'Low', color: 'bg-green-100 text-green-800' };
      if (maturity === 'Medium') return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
      return { level: 'High', color: 'bg-red-100 text-red-800' };
    }
    if (impact === 'High') {
      if (maturity === 'High') return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
      return { level: 'High', color: 'bg-red-100 text-red-800' };
    }
    return { level: 'Unknown', color: 'bg-gray-100 text-gray-800' };
  };

  const currentRisk = impactLevel && securityMaturity ? getRiskLevel(impactLevel, securityMaturity) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supplier Risk Assessment Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Impact Criteria - Compact Guide */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-sm mb-2 text-gray-700">Impact Guide</h3>
              <div className="space-y-1.5">
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Low</span>
                    <Badge className="text-xs h-4 bg-green-100 text-green-800">Low</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">
                    The supplier has limited access to allnex information, no personal data
                  </p>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Medium</span>
                    <Badge className="text-xs h-4 bg-yellow-100 text-yellow-800">Medium</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">
                    The supplier has access to <strong>CONFIDENTIAL</strong> or <strong>STRICTLY CONFIDENTIAL</strong> info and/or personal data
                  </p>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">High</span>
                    <Badge className="text-xs h-4 bg-red-100 text-red-800">High</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">
                    Critical for business OR access to <strong>CONFIDENTIAL</strong> or <strong>STRICTLY CONFIDENTIAL</strong> info
                  </p>
                </div>
              </div>
            </div>

            {/* Security Maturity Criteria - Compact Guide */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-sm mb-2 text-gray-700">Maturity Guide</h3>
              <div className="space-y-1.5">
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">High</span>
                    <Badge className="text-xs h-4 bg-green-100 text-green-800">High</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">
                    The supplier has one or more certifications in information security/data protection (e.g. ISO 27001)
                  </p>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Medium</span>
                    <Badge className="text-xs h-4 bg-yellow-100 text-yellow-800">Medium</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">
                    The supplier has security measures implemented but no relevant certifications
                  </p>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Low</span>
                    <Badge className="text-xs h-4 bg-red-100 text-red-800">Low</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">
                    The supplier has no or unclear security measures
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Level Matrix - Main Focus */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-base mb-3 text-gray-700">Risk Level Matrix</h3>
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="p-3 text-center font-semibold text-sm border-r border-gray-200" rowSpan={2}>Impact</TableHead>
                      <TableHead className="p-3 text-center font-semibold text-sm border-r border-gray-200" colSpan={3}>
                        Maturity
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-gray-50">
                      <TableHead className="p-3 text-center font-medium text-sm border-r border-gray-200">High</TableHead>
                      <TableHead className="p-3 text-center font-medium text-sm border-r border-gray-200">Medium</TableHead>
                      <TableHead className="p-3 text-center font-medium text-sm">Low</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-3 font-medium border-r border-gray-200 bg-gray-50">Low</TableCell>
                      <TableCell className="p-3 text-center bg-green-100 text-green-800 font-semibold border-r border-gray-200">Low Risk</TableCell>
                      <TableCell className="p-3 text-center bg-green-100 text-green-800 font-semibold border-r border-gray-200">Low Risk</TableCell>
                      <TableCell className="p-3 text-center bg-yellow-100 text-yellow-800 font-semibold">Medium Risk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-3 font-medium border-r border-gray-200 bg-gray-50">Medium</TableCell>
                      <TableCell className="p-3 text-center bg-green-100 text-green-800 font-semibold border-r border-gray-200">Low Risk</TableCell>
                      <TableCell className="p-3 text-center bg-yellow-100 text-yellow-800 font-semibold border-r border-gray-200">Medium Risk</TableCell>
                      <TableCell className="p-3 text-center bg-red-100 text-red-800 font-semibold">High Risk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-3 font-medium border-r border-gray-200 bg-gray-50">High</TableCell>
                      <TableCell className="p-3 text-center bg-yellow-100 text-yellow-800 font-semibold border-r border-gray-200">Medium Risk</TableCell>
                      <TableCell className="p-3 text-center bg-red-100 text-red-800 font-semibold border-r border-gray-200">High Risk</TableCell>
                      <TableCell className="p-3 text-center bg-red-100 text-red-800 font-semibold">High Risk</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Current Assessment Display - Prominent */}
              {showCurrentAssessment && currentRisk && (
                <div className="mt-4 p-4 border-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h4 className="text-sm font-semibold mb-3 text-gray-800">Current Assessment</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Impact:</span>
                        <Badge variant="outline" className="text-sm px-3 py-1">{impactLevel}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Maturity:</span>
                        <Badge variant="outline" className="text-sm px-3 py-1">{securityMaturity}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600 mr-2">Risk Level:</span>
                      <Badge className={`text-sm px-4 py-2 font-semibold ${currentRisk.color}`}>
                        {currentRisk.level} Risk
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 