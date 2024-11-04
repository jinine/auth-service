import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { Express } from 'express';
import pool from './util/db';


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('query parser', 'simple');

const port = process.env.PORT || 8991;
console.log(process.env.DB_USER);
app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'ok', timestamp: result.rows[0].now });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});