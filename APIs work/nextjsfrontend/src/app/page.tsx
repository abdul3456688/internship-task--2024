// import CreateLedger from '@/components/CreateLedger'
import CreateTransaction from '@/components/CreateTransaction'
import TransactionList from '@/components/TransactionList'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Transaction Management</h1>
        
        {/* Create Transaction Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Transaction</h2>
          <CreateTransaction />
        </div>

        {/* Transaction List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
          <TransactionList size={5} />
        </div>

        {/* Link to see all transactions */}
        <Link href="/transactions" className="block text-blue-500 text-center font-semibold hover:underline">
          See All Transactions
        </Link>
      </div>
    </>
  );
}
