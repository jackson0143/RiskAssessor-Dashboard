import DeleteVendorButton from './DeleteVendorButton';
import AddVendorForm from './AddVendorForm';
import { getAllVendors } from './actions';

export default async function Vendors() {
    const { success, vendors } = await getAllVendors();
    
    // Check if vendors loaded
    if (!success || !vendors) {
        return <div>Error loading vendors</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Vendors</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column - Add Vendor Form (40%) */}
                <div className="lg:col-span-2 space-y-4 w-full">
                    <h2 className="text-lg font-semibold">Add New Vendor</h2>
                    <AddVendorForm />
                </div>
                
                {/* Right Column - Vendor List (60%) */}
                <div className="lg:col-span-3 space-y-4">
                    <h2 className="text-lg font-semibold">Existing Vendors</h2>
                    <div className="space-y-4">
                        {vendors.map((vendor: { 
                            id: string; 
                            name: string; 
                            email: string;
                            address: string;
                            phone_no: string;
                            industry: string | null;
                            website: string | null;
                        }) => (
                            <div key={vendor.id} className="p-4 border rounded-lg flex justify-between items-center bg-slate-50/80 dark:bg-neutral-700">
                                <div>
                                    <span className="font-medium">Name: </span>{vendor.name} 
                                    <span className="font-medium ml-4">Email: </span>{vendor.email}
                                    <span className="font-medium ml-4">Phone: </span>{vendor.phone_no}
                                    {vendor.industry && (
                                        <span className="font-medium ml-4">Industry: </span>
                                    )}
                                    {vendor.industry}
                                </div>
                                <DeleteVendorButton vendorId={vendor.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

