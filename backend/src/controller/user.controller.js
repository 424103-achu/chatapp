import { searchUsersService } from "../services/searchUsers.service.js";
export const searchUsers = async (req, res, next) => {
  try {
    const { search } = req.query;

    const users = await searchUsersService(search, req.user.id);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};