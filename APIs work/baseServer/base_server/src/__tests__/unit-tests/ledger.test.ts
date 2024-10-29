import request from 'supertest';
import app from '../../app'; // Adjust the import path to your server file
import mongoose from 'mongoose';
import logger from '../../handlers/logger';
import database from '../../services/database';

describe('Ledger API', () => {
    beforeAll(async () => {
        // Connect to the database
        const connection = await database.connect();
        logger.info(`Database connection established`, {
            meta: { CONNECTION_NAME: connection.name }
        });
    });

    afterAll(async () => {
        // Clean up and close the connection
        await mongoose.connection.close();
    });

    it('should create a new ledger', async () => {
        const newLedger = {
            name: 'Ledger-1',
            balance: 0,
        };

        const response = await request(app)
            .post('/v1/bookkeeping/ledger')
            .send(newLedger)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.name).toBe(newLedger.name);
        expect(response.body.data.balance).toBe(newLedger.balance);
    });

    it('should fetch all ledgers', async () => {
        const response = await request(app)
            .get('/v1/bookkeeping/ledgers')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0); // Assuming there are ledgers
    });
});
