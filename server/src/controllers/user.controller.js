
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

// get users
export const getUsers = async (
  req,
  res,
  next
) => {
  try {

    const { role } = req.query;

    const users = await userService.getUsers(role);

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {
    next(error);
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


// get user distribution
export const getUserDistribution = async (req, res, next) => {
    try {

      const data =
        await userService.getUserDistribution();

      res.status(200).json({
        success: true,
        message:
          "User distribution fetched successfully",
        data,
      });

    } catch (error) {
      next(error);
    }
  };

  // delete users 
  export const deleteUser= async(req,res,next)=>{
     try {

    const  id  = req.params.id;

    await userService.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    next(error)
  }
  }

  // update user role 
 export const updateUserRole= async(req, res, next) =>{
  try {

    const { id } = req.params;
    const { role } = req.body;

    const user =
      await userService.updateUserRole(
        id,
        role
      );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });

  } catch (error) {
    next(error)
  }
}

// update user status

export const updateUserStatus=async(req, res, next) =>{
  try {

    const { id } = req.params;

    const user =
      await userService.updateUserStatus(
        id
      );

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });

  } catch (error) {
    next(error)

  }
}