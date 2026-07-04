import { signupService, loginService } from "../services/auth.service.js";
import { validateSignup } from "../validators/auth.validator.js";

export const signup = async (req, res) => {
  try {
    validateSignup(req.body);

    const result = await signupService(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors || [],
    });
  }
};
export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
