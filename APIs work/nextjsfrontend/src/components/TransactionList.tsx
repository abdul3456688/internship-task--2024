"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TotalBalance from './Balance'; // Adjust the path based on your file structure
// import Link from 'next/link';
import DeleteTransaction from './DeleteTransaction';
// import UpdateTransaction from './UpdateTransaction';
import Link from 'next/link';



// Function to fetch transactions using axios
const fetchTransactions = async () => {
  const response = await axios.get(`http://localhost:3000/v1/bookkeeping/transactions`);
  return response.data.data; // Assuming data holds the transaction array
};

const TransactionList = ({ size }: any) => {
  // Using useQuery to fetch transactions
  const { data: transactions = [], isLoading, isError, error } = useQuery({
    queryKey: ['transactions'], // unique identifier for the query
    queryFn: fetchTransactions, // the function to fetch data
  });

  // Show loading state
  if (isLoading) {
    return <div className="text-center text-gray-700">Loading transactions...</div>;
  }

  // Show error state
  if (isError) {
    return <div className="text-center text-red-600">Error fetching transactions: {error?.message}</div>;
  }

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <TotalBalance /> {/* Display the total balance here */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Transaction List</h1>
      
      <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
        {sortedTransactions.slice(0, size).map((transaction: any) => (
          <li
            key={transaction._id}
            className="flex justify-between items-center p-4 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            <span className="font-semibold text-gray-700">{transaction.description}</span>
            <span
              className={`font-medium ${
                transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.amount} -{' '}
              <span className="text-gray-500">
                {new Date(transaction.transactionDate).toLocaleDateString()}{' '}
                {new Date(transaction.transactionDate).toLocaleTimeString()}
              </span>
            </span>
            <div className="flex space-x-2">
            {/* Update button that links to the Update Transaction page */}
            <Link href={`/update/${transaction._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Update
              </button>
            </Link>
            <DeleteTransaction transaction={transaction} />
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
