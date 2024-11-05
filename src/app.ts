import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import healthCheck from './routes/healthCheck';
import { createUser } from './services/user';
import { login } from './services/login';
const crypto = require("crypto");
const session = require("express-session");

const secretKey = crypto.randomBytes(64).toString("hex");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

const port = process.env.PORT || 8991;

//routes 

//health check routes
app.get('/api/v1/health', healthCheck);

//user routes
app.post('/api/v1/user/createuser', createUser);

//auth routes
app.post('/api/v1/auth/login', login);

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});