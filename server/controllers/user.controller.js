import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      token,
      user,
      message: "User Registration Successful",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Inavlid Credentials",
          errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);
    res
      .status(200)
      .json({ success: true, token, user, message: "Login Successful" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    await BlacklistToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
