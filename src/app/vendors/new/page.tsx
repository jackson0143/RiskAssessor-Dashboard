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
      
         
            
                <div className=" space-y-4 w-full">
                
                    <AddVendorForm />
                </div>
                
                
            </div>
   
    )
}

