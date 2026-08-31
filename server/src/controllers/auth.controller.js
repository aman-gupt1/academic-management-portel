//****** important */
import AuthService from "../service/auth.service.js";
import User from "../models/User.js";

const authService=new AuthService(User)

// =========== CREATE USER FUNCTION =============
export const createUser = async(req, res,next)=>{
  try {
    const user = await authService.createUser(req.body);

    return res.status(201).json({
      success:true,
      message:"User Created Successfully",
      data:user
    })
  } catch (error) {
    next(error)
  }
}


// ========== LOGIN USER  ==============
export const loginUser = async (req, res, next) => {
  try {
    const result=await authService.loginUser(req.body)

        // store token in cookies
        res.cookie("token",result.token,{
          httpOnly:true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        }) 

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
      user: result.user,
    },
    });

  } catch (error) {
    console.error("Login Error: ",error.message);
    next(error)
  }
};


// ============ LOGOUT USER =================
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};