import transactionModel from '../models/transaction.model';
import { ITransaction } from '../types/transaction.interface';

export default {
    createTransaction: (payload: ITransaction) => {
        return transactionModel.create(payload);
    },
    getAllTransactions: () => {
        return transactionModel.find();
    },
    findTransactionById: (id: string) => {
        return transactionModel.findById(id);
    },
    updateTransactionById: async (transactionId: string, updateData: any) => {
        return await transactionModel.findByIdAndUpdate(transactionId, updateData, { new: true });
    },
    deleteTransactionById: async (transactionId: string) => {
        return transactionModel.findByIdAndDelete(transactionId);
    },
};
