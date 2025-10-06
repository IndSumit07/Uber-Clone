import { Captain } from "../models/captain.model.js";
import { createError } from "../utils/error.util.js";

export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw createError(400, "All fields are required.");
  }
  const existingCaptain = await Captain.findOne({ email });
  if (existingCaptain) {
    throw createError(409, "Captain already exists!");
  }

  const captain = await Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
