// DeleteTransaction.tsx
"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';



const DeleteTransaction = ( {transaction}:any) => {
    console.log(transaction)
  const queryClient = useQueryClient();
  const [isConfirming, setIsConfirming] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/v1/bookkeeping/transactions/${transaction._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      alert('Transaction deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    },
  });

  const handleDelete = () => {
    setIsConfirming(false);
    mutation.mutate();
  };

  return (
    <>
      <Button variant="outline" className="bg-red-500" onClick={() => setIsConfirming(true)}>
        Delete
      </Button>

      <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this transaction?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button onClick={() => setIsConfirming(false)} variant="outline" className="bg-gray-500">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleDelete} variant="outline" className="bg-red-600">
                Confirm
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTransaction;
