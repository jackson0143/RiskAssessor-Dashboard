import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { AlertTriangle,Check,X, Eye } from "lucide-react"
import Link from "next/link"

interface VendorTableRowProps {
  vendor: {
    id: string;
    name: string;
    email: string;
    address: string;
    phone_no: string;
    industry: string | null;
    website: string | null;
    riskScore: number;
    status?: 'Active' | 'Inactive' | 'Pending';
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

  const getStatusVariant = (status?: 'Active' | 'Inactive' | 'Pending') => {
    switch (status) {
      case 'Active':
        return {
          icon: <Check className="h-4 w-4 text-green-500" />,
          text: 'Active',
          className: 'text-green-600 font-medium'
        };
      case 'Inactive':
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

  return (
    <TableRow>
      {/* Vendor Name*/}
      <TableCell>
        <div>
          <div className="font-medium">{vendor.name}</div>
          <div className="text-sm text-muted-foreground">
            {vendor.email}
          </div>
        </div>
      </TableCell>

      {/* Vendor Industry*/}
      <TableCell>
        <Badge variant="secondary">
          {vendor.industry || "N/A"}
        </Badge>
      </TableCell>

      {/* Vendor Risk Level (from the score)*/}
      <TableCell>
        <Badge
          variant={getRiskBadgeVariant(vendor.riskScore)}
        >
          {getRiskLevel(vendor.riskScore)}
        </Badge>
      </TableCell>


      {/* Vendor Status*/}
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

      {/* Vendor Owner*/}
      <TableCell>
        <div>
          <div className="text-sm">John Doe</div>
          <div className="text-xs text-muted-foreground">
            IT Department
          </div>
        </div>
      </TableCell>

      {/*Primary contact*/}
      <TableCell>
        <div>
          <div className="text-sm">{vendor.name}</div>
          <div className="text-xs text-muted-foreground">
            {vendor.email}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Link href={`/vendors/${vendor.id}`}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
} 