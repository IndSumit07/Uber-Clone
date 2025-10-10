import { Ride } from "../models/ride.model.js";
import { DistanceService } from "./distance.service.js";
import crypto from "crypto";

function getOtp(length) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

/**
 * Calculate fare for a given vehicle type
 */
export async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const destinationTime = await DistanceService.calculateDistanceTime(
    pickup,
    destination
  );

  const distance = destinationTime?.distance; // km
  const time = destinationTime?.duration; // min

  const fareRates = {
    motorcycle: {
      baseFare: 10,
      perKm: 5,
      perMin: 1,
      minFare: 30,
    },
    auto: {
      baseFare: 5,
      perKm: 2,
      perMin: 0.5,
      minFare: 5,
    },
    car: {
      baseFare: 20,
      perKm: 10,
      perMin: 2,
      minFare: 50,
    },
  };

  const rates = fareRates[vehicleType];
  if (!rates) {
    throw new Error(
      "Invalid vehicle type. Choose 'motorcycle', 'auto', or 'car'."
    );
  }

  let fare = rates.baseFare + distance * rates.perKm + time * rates.perMin;
  if (fare < rates.minFare) fare = rates.minFare;

  fare = Math.round(fare);

  return {
    vehicleType,
    distance: distance,
    time: time,
    totalFare: fare,
    breakdown: {
      baseFare: rates.baseFare,
      distanceFare: (distance * rates.perKm).toFixed(2),
      timeFare: (time * rates.perMin).toFixed(2),
    },
  };
}

/**
 * Create new ride and also return all fare options for display
 */
export const createNewRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination, and vehicleType are required");
  }

  // Calculate fares for all vehicle types
  const vehicleTypes = ["motorcycle", "auto", "car"];
  const allFares = {};

  for (const type of vehicleTypes) {
    allFares[type] = await getFare(pickup, destination, type);
  }

  // Create the actual ride document for the selected vehicle type
  const ride = await Ride.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: getOtp(6),
    fare: allFares[vehicleType].totalFare,
  });

  // Return both the ride and fare options
  return {
    ride,
    fareOptions: allFares,
  };
};

export const calculateAllFares = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const vehicleTypes = ["motorcycle", "auto", "car"];
  const allFares = {};

  for (const type of vehicleTypes) {
    allFares[type] = await getFare(pickup, destination, type);
  }

  const destinationTime = await DistanceService.calculateDistanceTime(
    pickup,
    destination
  );


  return {
    pickup,
    destination,
    distance: destinationTime.distance,
    time: destinationTime.duration,
    fares: allFares,
  };
};
