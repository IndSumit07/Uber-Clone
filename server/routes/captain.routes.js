import express from "express";
import { body } from "express-validator";
import {
  getCaptainProfile,
  login,
  logout,
  register,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

const captainRouter = express.Router();

captainRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 characters long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Veichle Type"),
  ],
  register
);

captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  login
);

captainRouter.get("/profile", authCaptain, getCaptainProfile);

captainRouter.get("/logout", authCaptain, logout);

export default captainRouter;
