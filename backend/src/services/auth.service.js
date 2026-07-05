import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import ApiError from "../utils/error.js";

export const signupService = async (userData) => {
  const { username, email, password } = userData;

  const existingUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const existingUserUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  //   ///debugging
  //   console.log("HEREHEREHERE")
  if (existingUserEmail) {
    // const error = new Error("Email  already exists.");
    // error.statusCode = 409;
    // throw error;
    throw new ApiError(409,"Email already exists");
  }
  if (existingUserUsername) {
    // const error = new Error(" Username already exists.");
    // error.statusCode = 409;
    // throw error;
    throw new ApiError(409,"Username already exists");
  }

  const hashedPassword = await hashPassword(password);
  //   console.log("CREATInG");

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  const token = generateToken({
    userId: user.id,
  });
  return {
    message: "User created successfully.",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};
export const loginService = async (userdata) => {
  const { email, password } = userdata;
  // console.log(userdata);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    // const error = new Error("Invalid email or password");
    // error.statusCode = 401;
    // throw error;
    throw new ApiError(401,"Invalid email or password");
  }
  // console.log(user);

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    // const error = new Error("Invalid email or password");
    // error.statusCode = 401;
    // throw error;
    throw new ApiError(401,"Invalid email or password");
  }
  const token = await generateToken({
    userId: user.id,
  });
  return {
    message: "Login successful.",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};
