import { Request, Response, NextFunction } from 'express';
import transactionRepo from './_shared/repo/transaction.repository';
// import ledgerRepo from './_shared/repo/ledger.repository';
import httpResponse from '../../handlers/httpResponse';
import httpError from '../../handlers/errorHandler/httpError';


export default {
    createTransaction: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newTransaction = await transactionRepo.createTransaction(req.body);

            httpResponse(res, req, 201, 'Transaction created successfully', newTransaction);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },

    getAllTransactions: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Optional: Filtering by date or type could be added here
            const transactions = await transactionRepo.getAllTransactions();
            httpResponse(res, req, 200, 'Transactions fetched successfully', transactions);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },

    transactionById:async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const transactionId = req.params.id;
            const transactionById=await transactionRepo.findTransactionById(transactionId)
            if (!transactionById) {
                return httpResponse(res, req, 404, 'Transaction not found',transactionById);
            }
    
            httpResponse(res, req, 200, 'Transaction by id:', transactionById);
        } catch (error) {
            httpError(next, error, req, 500);
        }

    },

    getBalance: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactions = await transactionRepo.getAllTransactions();

            // Assume each transaction has an amount and type (e.g., 'income' or 'expense')
            const balance = transactions.reduce((total, transaction) => {
                if (transaction.type === 'INCOME') {
                    return total + transaction.amount;
                } else if (transaction.type === 'EXPENSE') {
                    return total - transaction.amount;
                }
                return total;
            }, 0); // Start with a total of 0

            httpResponse(res, req, 200, 'Balance fetched successfully', { balance });
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },
    updateTransaction: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactionId = req.params.id;
            const updatedTransaction = await transactionRepo.updateTransactionById(transactionId, req.body);
    
            if (!updatedTransaction) {
                return httpResponse(res, req, 404, 'Transaction not found',updatedTransaction);
            }
    
            httpResponse(res, req, 200, 'Transaction updated successfully', updatedTransaction);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },

    deleteTransaction: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transactionId = req.params.id || req.body.id;
            const deletedTransaction = await transactionRepo.deleteTransactionById(transactionId);
    
            if (!deletedTransaction) {
                return httpResponse(res, req, 404, 'Transaction not found',deletedTransaction);
            }
    
            httpResponse(res, req, 200, 'Transaction deleted successfully', deletedTransaction);
        } catch (error) {
            httpError(next, error, req, 500);
        }
    },


    


};
