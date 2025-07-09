'use client';

import { Button } from '@/components/ui/button';
import { deleteUser} from './actions';

//NEED TO ADD AUTHENTICATION FOR THIS
//in TS, we define a type for the props 
interface DeleteUserButtonProps {
  userId: number;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {

  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      window.location.reload();
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"

    >
      Delete
    </Button>
  );
} 