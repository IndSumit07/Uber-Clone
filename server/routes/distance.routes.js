import express from "express";
import { DistanceController } from "../controllers/distance.controller.js";

const distanceRouter = express.Router();

distanceRouter.post("/calculate-route", DistanceController.calculateRoute);

export default distanceRouter;
