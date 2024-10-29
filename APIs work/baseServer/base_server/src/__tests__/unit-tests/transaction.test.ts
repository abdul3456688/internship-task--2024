import request from 'supertest';
import app from '../../app'; // Adjust the import path to your server file
import mongoose from 'mongoose';
import logger from '../../handlers/logger';
import database from '../../services/database';

describe('Transactions API', () => {
    beforeAll(async () => {
        // Connect to your test database
        // Connect to the database
        const connection = await database.connect()
        logger.info(`Database connection established`, {
            meta: { CONNECTION_NAME: connection.name }
        })
    });

    afterAll(async () => {
        // Clean up and close the connection
        await mongoose.connection.close();
    });

    it('should create a new transaction', async () => {
        const newTransaction = {
            // Replace with the structure of your transaction data
            ledgerId: '67050e8cbd3b60a606eff6cf', // example ledger ID
            amount: 5000,
            description: 'Test transaction',
            type: 'INCOME', // or 'debit'
            date: new Date().toISOString(),
        };

        const response = await request(app)
            .post('/v1/bookkeeping/transaction')
            .send(newTransaction)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.amount).toBe(newTransaction.amount);
    });

    it('should fetch all transactions', async () => {
        const response = await request(app)
            .get('/v1/bookkeeping/transactions')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
