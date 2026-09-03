
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


export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select("name email phone role");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};