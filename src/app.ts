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

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });