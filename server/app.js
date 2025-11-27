import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import "./db/connection.js";
import authRouter from "./router/auth.js";
import authenticate from "./middleware/authenticate.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

app.use(cookieParser());

//Important middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

//Routes
app.use(authRouter);

const PORT = process.env.PORT || 5000;

// Middleware example
// const middleware = (req, res, next) => {
//     console.log(`Middleware active`);
//     next();
// };

// app.get("/about", middleware, (req, res) => {
//     res.send(`Hello About Page`);
// });

// app.get("/contact", (req, res) => {
//     res.send(`Hello Contact Page`);
// });

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
