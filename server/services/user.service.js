import { User } from "../models/user.model.js";
import { createError } from "../utils/error.util.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw createError(400, "All fields are required.");
  }

  const user = await User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
