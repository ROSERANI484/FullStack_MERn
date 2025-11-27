import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() =>{
    console.log(` ✅ MongoDB connected sucessfully`);
}).catch ((err)=> console.log(`MongoDB connection failed`));