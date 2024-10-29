// import mongoose from "mongoose";


export interface ITransaction {
    description: string;
    amount: number;
    transactionDate: Date;
    type: 'INCOME' | 'EXPENSE'; // Define types of transactions
    ledgerId?: string; // Optional reference for invoice, payment, etc.
}

// export interface ILedger {
//     name: string;
//     balance: number;
//     transactions: ITransaction[];
// }


