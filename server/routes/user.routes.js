import express from "express";
import { body } from "express-validator";
import {
  login,
  register,
  getUserProfile,
  logout,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email."),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long."),
  ],
  register
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long."),
  ],
  login
);

userRouter.get("/profile", authUser, getUserProfile);

userRouter.get("/logout", authUser, logout);

export default userRouter;
