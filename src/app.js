import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({limit : "169kb", extended : true}));
import userRouter from "./router/user.router.js";

app.use("/api/rn/user", userRouter);
export default app
