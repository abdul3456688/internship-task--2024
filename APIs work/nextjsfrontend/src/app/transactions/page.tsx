import TransactionList from '@/components/TransactionList';
import React from 'react';
import Link from 'next/link'; // Import the Link component

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Go Back Link */}
      <div className="mb-4 text-center">
        <Link href="/" className="text-blue-500 font-semibold hover:underline">
          Go Back
        </Link>
      </div>
      
      <TransactionList />
      
    </div>
  );
}

export default Page;
