import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/mongodb.config.js";
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";
import geocodingRouter from "./routes/geocoding.routes.js";
import distanceRouter from "./routes/distance.routes.js";
import rideRouter from "./routes/ride.routes.js";

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
app.use("/api", geocodingRouter);
app.use("/api", distanceRouter);
app.use("/api/rides", rideRouter);
export default app;
