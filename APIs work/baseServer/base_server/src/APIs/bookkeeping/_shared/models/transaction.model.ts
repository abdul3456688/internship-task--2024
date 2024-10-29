import mongoose from 'mongoose';
import { ITransaction } from '../types/transaction.interface';

const transactionSchema = new mongoose.Schema<ITransaction>(
    {
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        transactionDate: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            enum: ['INCOME', 'EXPENSE'],
            required: true,
        },
        // ledgerId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Ledger', // Ensure this matches the name of your Ledger model
        //     required: true,
        // }
        
        // referenceId: String, // Optional field
    },
    { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
