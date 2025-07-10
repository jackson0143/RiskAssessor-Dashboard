import DeleteVendorButton from './DeleteVendorButton';
import AddVendorForm from './AddVendorForm';
import { getAllVendors } from '../search/actions';

export default async function Vendors() {
    const { success, vendors } = await getAllVendors();
    
    // Check if vendors loaded
    if (!success || !vendors) {
        return <div>Error loading vendors</div>;
    }

    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">Vendors</h1>
            <AddVendorForm />
            <ul className="space-y-4 w-1/2">
                {vendors.map((vendor: { 
                    id: string; 
                    name: string; 
                    email: string;
                    address: string;
                    phone_no: string;
                    industry: string | null;
                    website: string | null;
                }) => (
                    <li key={vendor.id} className="p-4 border rounded-lg flex justify-between items-center">
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
                    </li>
                ))}
            </ul>
        </div>
    )
}

