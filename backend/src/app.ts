import express, { Application } from "express";
import cookieParser from "cookie-parser";
import rootRoute from "./routes/route.js";
import cors from "cors"

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const origin = process.env.FRONTEND_URI
app.use(cors({
  origin, 
  credentials: true,
}));

app.use("/", rootRoute);


export const server = app
