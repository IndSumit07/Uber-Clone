import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/mongodb.config.js";
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/user", userRouter);
app.use("/api/captain", captainRouter);

export default app;
