import express from "express";
import { body, query } from "express-validator";
import { createRide, getAllFares } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const rideRouter = express.Router();

rideRouter.post(
  "/create",
  authUser,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
    body("vehicleType")
      .isIn(["motorcycle", "auto", "car"])
      .withMessage(
        "Invalid vehicle type. Choose 'motorcycle', 'auto', or 'car'."
      ),
  ],
  createRide
);

rideRouter.get(
  "/fares",
  authUser,
  [
    query("pickup").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  getAllFares
);
export default rideRouter;
