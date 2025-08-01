"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Filter, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllVendors, searchVendors } from "./actions";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { VendorTableRow } from "@/components/vendor-table-row";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string | null;
  department: string | null;
  type: "PRIMARY" | "SECONDARY";
}

interface Vendor {
  id: string;
  name: string;
  ownerName: string | null;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  website: string | null;
  maturityScore: number | null;
  maturityRating: string | null;
  impactScore: number | null;
  impactRating: string | null;
  riskScore: number | null;
  riskRating: string | null;
  category: string | null;
  description: string | null;
  lastReviewDate: Date | null;
  nextReviewDate: Date | null;
  contacts: Contact[];
  createdAt: Date;
  updatedAt: Date;
}
//This is a bit more advanced, it uses a hook to delay the search until the user stops typing
//Feel free to ignore this, it's not important for the project
export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    risk: "all",
    status: "all",
    category: "all",
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      loadAllVendors();
    } else {
      handleSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  //Load all vendors on mount, and when search is cleared
  //check if we can make this a server sided component later
  const loadAllVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllVendors();
      if (result.success && result.vendors) {
        setVendors(result.vendors);
      } else {
        setError("Failed to load vendors");
      }
    } catch (error) {
      console.error("Error loading vendors:", error);
      setError("Failed to load vendors");
    }
    setLoading(false);
  };

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const { success, vendors } = await searchVendors(term);
      if (success && vendors) {
        setVendors(vendors);
      } else {
        setError("Failed to search vendors");
      }
    } catch (error) {
      console.error("Error searching vendors:", error);
      setError("Failed to search vendors");
    }
    setLoading(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ risk: "all", status: "all", category: "all" });
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  // Pagination
  const totalPages = Math.ceil(vendors.length / pagination.pageSize);
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const currentVendors = vendors.slice(startIndex, endIndex);

  const handlePageChange = (pageIndex: number) => {
    setPagination(prev => ({ ...prev, pageIndex }));
  };

  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearchTerm]);
    //grab from db
  const uniqueCategories = [
    ...new Set(vendors.map(vendor => vendor.category).filter(Boolean)),
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Vendors</h1>
          <p className="text-muted-foreground">
            Find and search through all available vendors
          </p>
        </div>
        <Link href="/admin/vendors/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="search">Search Vendors</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by vendor name, category, contact, owner, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base bg-[#f3f3f5]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>
                Apply filters to narrow down your search results
              </CardDescription>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Risk Level</Label>
              <Select value={filters.risk} onValueChange={(value) => updateFilter('risk', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All risk levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category || ""}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* error handling*/}
      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={loadAllVendors}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
            <CardDescription>Loading vendors...</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Last Review</TableHead>
                  <TableHead>Next Review</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }, (_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-24" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
              <CardDescription>
                {currentVendors.length === vendors.length
                  ? `Showing ${currentVendors.length} of ${vendors.length} vendors`
                  : "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentVendors.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No vendors found matching your criteria
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Primary Contact</TableHead>
                      <TableHead>Last Review</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentVendors.map((vendor) => (
                      <VendorTableRow key={vendor.id} vendor={vendor} />
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(pagination.pageIndex - 1)}
                    className={
                      pagination.pageIndex === 0
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page - 1)}
                      isActive={pagination.pageIndex === page - 1}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(pagination.pageIndex + 1)}
                    className={
                      pagination.pageIndex === totalPages - 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
