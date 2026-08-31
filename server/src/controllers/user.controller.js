
import UserService from "../service/user.service.js";
import User from "../models/User.js";

const userService=new UserService(User);


// ========= GET PROFILE ==========
export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.userId)

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    next(error)
  }
};