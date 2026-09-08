
import UserService from "../service/user.service.js";
import User from "../models/User.js";

const userService=new UserService(User);


// ========= GET PROFILE ==========
export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user._id)
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    next(error)
  }
};


export const getUsers = async (req, res,next) => {
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
    next(error)
  }
};

// chnage password
export const changePassword= async (req,res,next)=>{
  try {
   const result =  await userService.changePassword(req.user._id,req.body);

   res.status(200).json({
    success:true,
    result
   })

    return res.status(201).json({
      success:true,
      message:"Password Update Successfuly"
    })
  } catch (error) {
    next(error)
  }
}