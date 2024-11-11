import { Router } from 'express';
import controller from './controller';

const router = Router();

// 

router.post('/transaction', controller.createTransaction);
router.get('/transactions', controller.getAllTransactions);
router.get('/transactions/:id',controller.transactionById)


router.get('/balance', controller.getBalance);

router.delete('/transactions/:id', controller.deleteTransaction)
router.put('/transactions/:id', controller.updateTransaction);


export default router;
