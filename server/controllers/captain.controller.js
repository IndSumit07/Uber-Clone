import { validationResult } from "express-validator";
import { Captain } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    res
      .status(201)
      .json({ message: "Captain Registration Successful", token, captain });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatched = await captain.comparePassword(password);

    if (!isMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "Captain Login Successful", token, captain });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const getCaptainProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.captain);
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
