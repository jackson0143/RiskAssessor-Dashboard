import DeleteUserButton from './DeleteUserButton';
import AddUserForm from './AddUserForm';
import { getAllUsers } from './actions';

export default async function Vendors() {
    const { success, users} = await getAllUsers();
    //check if users loaded
    if (!success || !users) {
        return <div>Error loading users</div>;
    }
    


    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">Vendors</h1>
            <AddUserForm />
            <ul className="space-y-4 w-1/2">
            {/*Structure of types depends on prisma schema */}
                {users.map((user: { id: number; name: string | null; email: string  }) => (
                    <li key={user.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                            <span className="font-medium">Name: </span>{user.name} 
                            <span className="font-medium ml-4">Email: </span>{user.email}
                        </div>
                        <DeleteUserButton userId={user.id} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

