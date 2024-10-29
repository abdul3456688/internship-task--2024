"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch balance data
const fetchBalance = async () => {
  const response = await axios.get(`http://localhost:3000/v1/bookkeeping/balance`);
  return response.data.data.balance; // Assuming the balance is in response.data.data.balance
};

const TotalBalance = () => {
  // Using useQuery to fetch balance
  const { data: balance = null, isLoading, isError, error } = useQuery({
    queryKey: ['balance'], // unique key for caching and tracking the query
    queryFn: fetchBalance, // function that fetches balance
    refetchInterval: 2000, // Refetch every 5 seconds
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching balance: {error.message}</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Total Balance</h2>
      <p className="text-xl font-semibold text-green-500">
        {balance !== null ? `${balance.toFixed(2)}` : 'N/A'}
      </p>
    </div>
  );
};

export default TotalBalance;
