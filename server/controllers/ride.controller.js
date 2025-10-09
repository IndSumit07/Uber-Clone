import { validationResult } from "express-validator";
import { calculateAllFares, createNewRide } from "../services/ride.service.js";

/**
 * Controller for creating a new ride
 */
export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;

    const { ride, fareOptions } = await createNewRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    return res.status(201).json({
      message: "Ride created successfully",
      ride,
      fareOptions, // you can show these in UI
    });
  } catch (error) {
    console.error("Ride creation failed:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllFares = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    const allFares = await calculateAllFares(pickup, destination);
    return res.status(200).json({ fares: allFares });
  } catch (error) {
    console.error("Fare calculation failed:", error);
    return res.status(500).json({ message: error.message });
  }
};
