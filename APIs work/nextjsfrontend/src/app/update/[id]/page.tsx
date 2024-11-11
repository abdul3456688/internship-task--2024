"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const fetchTransaction = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/v1/bookkeeping/transactions/${id}`);
  return response.data.data; // Adjust based on your API response structure
};

const UpdateTransaction = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string }; // Retrieve the transaction ID from URL params
  const queryClient = useQueryClient();

  // Fetch transaction data
  const { data: transaction, isLoading, isError, error } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransaction(id),
  });

  // State variables for form fields
//   const [ledgerId, setLedgerId] = useState(transaction?.ledgerId || '');
  const [amount, setAmount] = useState(transaction?.amount || 0);
  const [description, setDescription] = useState(transaction?.description || '');
  const [type, setType] = useState(transaction?.type || 'INCOME');

  // Sync state with fetched transaction data
  useEffect(() => {
    if (transaction) {
    //   setLedgerId(transaction.ledgerId);
      setAmount(transaction.amount);
      setDescription(transaction.description);
      setType(transaction.type);
    }
  }, [transaction]);
  console.log("Transaction ID:", id);


  // Mutation function to update the transaction
  const updateMutation = useMutation({
    mutationFn: async (updatedTransaction: {  amount: number; description: string; type: string }) => {
        console.log("Fetching transaction data for ID:", id);

        const response = await axios.put(`http://localhost:3000/v1/bookkeeping/transactions/${id}`, updatedTransaction);
      return response.data;
    //   console.log("response",response)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] }); // Refresh the transaction list
      router.push('/'); // Redirect back to main page after update
    },
    onError: (error) => {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction');
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({  amount, description, type });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Transaction</h1>
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
        <Button type="submit" className="w-full bg-blue-500" variant="outline" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Updating...' : 'Update Transaction'}
        </Button>
        {updateMutation.isError && <p className="text-red-500 mt-2">Error: {updateMutation.error?.message}</p>}
      </form>
    </div>
  );
};

export default UpdateTransaction;
