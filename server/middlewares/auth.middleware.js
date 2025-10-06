import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.util.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { Captain } from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
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

    if (!token) {
      throw createError(401, "Unauthorized: No token provided");
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token Expired, Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      throw createError(401, "Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
export const authCaptain = async (req, res, next) => {
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

    if (!token) {
      throw createError(401, "Unauthorized: No token provided");
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token Expired, Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      throw createError(401, "Unauthorized: User not found");
    }

    req.captain = captain;
    next();
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
