'use client';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
// import { ChevronDown } from "lucide-react"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllVendors, searchVendors } from './actions';
import { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { VendorCard } from '@/components/vendor-card';
import Link from 'next/link';

interface Vendor {
  id: string;
  name: string;
  email: string;
  address: string;
  phone_no: string;
  industry: string | null;
  website: string | null;
  riskScore: number;
  createdAt: Date;
  updatedAt: Date;
}
//This is a bit more advanced, it uses a hook to delay the search until the user stops typing
//Feel free to ignore this, it's not important for the project
export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
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
        setError('Failed to load vendors');
      }
    } catch (error) {
      console.error('Error loading vendors:', error);
      setError('Failed to load vendors');
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
        setError('Failed to search vendors');
      }
    } catch (error) {
      console.error('Error searching vendors:', error);
      setError('Failed to search vendors');
    }
    setLoading(false);
  };

  //Pagination stuff, feel free to ignore this
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

  const clearFilter = () => {
    setSearchTerm('');
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Vendors</h1>
          <p className="text-gray-500">Find and search through all available vendors</p>
        </div>
        <Link href="/vendors/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Vendor
          </Button>
        </Link>
      </div>

      <div className='mb-8'>
        {/* Search Input */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search vendors by name, email, or other criteria..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters (implement later)*/}
        <div className="flex flex-wrap gap-4">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                All Categories
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Categories</DropdownMenuItem>
              <DropdownMenuItem>Supplier</DropdownMenuItem>
              <DropdownMenuItem>Contractor</DropdownMenuItem>
              <DropdownMenuItem>Service Provider</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                All Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* <Button>
            Search
          </Button> */}

          <Button variant = "outline"className="rounded-sm " onClick={clearFilter}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          <span className="text-gray-500">
            {loading ? 'Loading...' : `Showing ${currentVendors.length} of ${vendors.length} results`}
          </span>
        </div>

        {/* Error state*/}
        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button variant="outline" onClick={loadAllVendors} className="mt-2">
              Try Again
            </Button>
          </div>
        )}

        {/* Loading state*/}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="bg-slate-50/80 dark:bg-neutral-900 rounded-lg border p-6">
                <div className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-3 w-32" />
                    <div className="flex gap-4 mt-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List all the results, given that there are no errors or loading*/}
        {!loading && !error && (
          <>
            <div className="space-y-4">
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">No vendors found</p>
                  <p>There are no vendors in the system</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(pagination.pageIndex - 1)}
                        className={pagination.pageIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                        className={pagination.pageIndex === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}