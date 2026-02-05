import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js"
import {createClient} from "redis";

dotenv.config();

// Verify REDIS_URL is loaded
if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL environment variable is not defined. Check your .env file.");
}

connectDb();

export const redisClient = createClient(
    {
        url: process.env.REDIS_URL,
    }
);

redisClient.connect().then(()=>console.log("Connected to Redis"));
const app = express();

const port =process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running ${port}`);
})