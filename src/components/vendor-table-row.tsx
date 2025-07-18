import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { AlertTriangle, Check, X, Eye } from "lucide-react"
import Link from "next/link"

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string | null;
  department: string | null;
  type: 'PRIMARY' | 'SECONDARY';
}

interface VendorTableRowProps {
  vendor: {
    id: string;
    name: string;
    ownerName: string | null;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    website: string | null;
    securityMaturity: string | null;
    impact: string | null;
    riskScore: number;
    category: string | null;
    description: string | null;
    contacts: Contact[];
  };
}

export function VendorTableRow({ vendor }: VendorTableRowProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 80) return 'destructive';
    if (score >= 60) return 'secondary';
    return 'default';
  };

  const getStatusVariant = (status: 'ACTIVE' | 'INACTIVE' | 'PENDING') => {
    switch (status) {
      case 'ACTIVE':
        return {
          icon: <Check className="h-4 w-4 text-green-500" />,
          text: 'Active',
          className: 'text-green-600 font-medium'
        };
      case 'INACTIVE':
        return {
          icon: <X className="h-4 w-4 text-red-500" />,
          text: 'Inactive',
          className: 'text-red-600 font-medium'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
          text: 'Pending',
          className: 'text-yellow-600'
        };
    }
  };

  // Get primary contact
  const primaryContact = vendor.contacts.find(contact => contact.type === 'PRIMARY');

  return (
    <TableRow>
      {/* Vendor Name */}
      <TableCell>
        <div>
          <div className="font-medium">{vendor.name}</div>
          <div className="text-sm text-muted-foreground">
            {vendor.website || "No website"}
          </div>
        </div>
      </TableCell>

      {/* Owner */}
      <TableCell>
        <div>
          <div className="text-sm">{vendor.ownerName || "N/A"}</div>
          <div className="text-xs text-muted-foreground">
            {vendor.category || "No category"}
          </div>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <div className="flex items-center space-x-1">
          {(() => {
            const statusVariant = getStatusVariant(vendor.status);
            return (
              <>
                {statusVariant.icon}
                <span className={`text-sm ${statusVariant.className}`}>
                  {statusVariant.text}
                </span>
              </>
            );
          })()}
        </div>
      </TableCell>

      {/* Risk Level */}
      <TableCell>
        <Badge variant={getRiskBadgeVariant(vendor.riskScore)}>
          {getRiskLevel(vendor.riskScore)}
        </Badge>
      </TableCell>

      {/*Primary contact*/}
      <TableCell>
        <div>
          <div className="text-sm">{primaryContact?.name || "N/A"}</div>
          <div className="text-xs text-muted-foreground">
            {primaryContact?.email || "No email"}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Link href={`/admin/vendors/${vendor.id}`}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
} 