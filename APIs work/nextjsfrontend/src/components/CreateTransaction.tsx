"use client";
import { useState } from 'react';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const CreateTransaction = () => {
  const [ledgerId, setLedgerId] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('INCOME'); // Default to INCOME
  const [isConfirming, setIsConfirming] = useState(false); // State for confirmation
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const queryClient = useQueryClient();

  // Mutation function
  const mutation = useMutation({
    mutationFn: async (transactionData: { ledgerId: string, amount: number, description: string, type: string }) => {
      const response = await axios.post(`http://localhost:3000/v1/bookkeeping/transaction`, transactionData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] }); // Refresh transactions after success
      setIsPopupVisible(true); // Show success popup
      setLedgerId('');
      setAmount(0);
      setDescription('');
    },
    onError: (error) => {
      console.error('Error creating transaction:', error);
      alert('Failed to create transaction');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirming(true); // Show confirmation prompt
  };

  const handleConfirm = () => {
    setIsConfirming(false); // Hide confirmation prompt
    mutation.mutate({ ledgerId, amount, description, type }); // Proceed with transaction creation
  };

  const handleCancel = () => {
    setIsConfirming(false); // Cancel the confirmation
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          required
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <Button
      type="submit"
      className="w-full bg-blue-500"
      variant="outline" // Use the appropriate variant for blue
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Creating...' : 'Create Transaction'}
    </Button>
        {mutation.isError && <p className="text-red-500 mt-2">Error: {mutation.error?.message}</p>}
      </form>

      {/* Confirmation prompt */}
      <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Transaction</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to create this transaction?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel asChild>
        <Button onClick={handleCancel} variant="outline" className="bg-red-500">
          Cancel
        </Button>
      </AlertDialogCancel>
      <AlertDialogAction asChild>
        <Button onClick={handleConfirm} variant="outline" className="bg-green-400 mr-2">
          Confirm
        </Button>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


      {/* Popup message */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Transaction Created!</h2>
            <p>Your transaction has been created successfully.</p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTransaction;
