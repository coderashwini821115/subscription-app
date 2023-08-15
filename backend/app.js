import express  from "express";
import {config}  from "dotenv";
import paymentRoutes from './routes/paymentRoutes.js';
// import { urlencoded } from "body-parser";
import cors from 'cors';
// import { urlencoded } from "body-parser";
 config({path: "./config/.env"});
 export const app = express();
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use('/api', paymentRoutes);

 app.get("/api/getkey", (req, res) =>
res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);