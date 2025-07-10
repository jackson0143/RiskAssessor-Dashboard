'use client';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ChevronDown } from "lucide-react"
import { getAllUsers, searchUsers } from './actions';
import { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
interface Vendor {
  id: number;
  name: string | null;
  email: string;
}
//This is a bit more advanced, it uses a hook to delay the search until the user stops typing
//Feel free to ignore this, it's not important for the project
export default function Search() {
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
  const loadAllVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllUsers();
      if (result.success && result.users) {
        setVendors(result.users);
      } else {
        setError('Failed to load vendors');
      }
    } catch (error) {
      console.error('Error loading vendors:', error);
      setError('Failed to load vendors');
    }
    setLoading(false);
  };
//handle searching the vendors/users
  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const { success, users } = await searchUsers(term);
      if (success && users) {
        setVendors(users);
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

  // Reset to page 0 when search changes
  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearchTerm]);



  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Search Vendors</h1>
        <p className="text-gray-600">Find and filter through all available vendors</p>
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
          <DropdownMenu>
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
          </DropdownMenu>

          <Button>
            Search
          </Button>

          <Button variant="outline">
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div>
        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          <span className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${currentVendors.length} of ${vendors.length} results`}
          </span>
        </div>

        {/* Error state*/}
        {error && (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
            <Button variant="outline" onClick={loadAllVendors} className="mt-2">
              Try Again
            </Button>
          </div>
        )}

        {/* Loading state*/}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading vendors...</p>
          </div>
        )}

        {/* List all the results, given that there are no errors or loading*/}
        {!loading && !error && (
          <>
            <div className="space-y-4">
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-lg">{vendor.name || 'Unnamed Vendor'}</CardTitle>
                        <p className="text-gray-600 text-sm">{vendor.email}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Vendor</span>
                        </div>
                      </div>
                      {/* Badges for the vendor*/}
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </CardHeader>
                  </Card>
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
                    
                    {/* Simple 0-based indexing */}
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index)}
                          isActive={pagination.pageIndex === index}
                          className="cursor-pointer"
                        >
                          {index + 1}
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