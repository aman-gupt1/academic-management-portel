//****** important */
import AuthService from "../service/auth.service.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";


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
export const logoutUser = async (req, res, next) => {
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

// reset password
export const forgotPassword = async(req,res,next)=>{
try {
const {email}=req.body;

const {user, resetUrl} =await authService.forgotPassword(email)

await sendEmail({
  to:user.email,
  subject: "Password Reset",
  html:` 
   <h2>Password Reset Request</h2>
   <p>
    Click the button below
    to reset your password.
  </p>
  <a
    href="${resetUrl}"
    style="background:#4f46e5; color:white; padding:12px 20px; text-decoration:none;
              border-radius:6px;">
              Reset Password 
              </a>
  <p> This link expires in 15 minutes. </p>`
})

  return res.status(200).json({
    success:true,
    message:"Reset link sent successfully"
  })
} catch (error) {
   console.log("CONTROLLER CATCH REQ",error.message)
  next(error)
}
}

export const resetPassword = async (req, res, next) => {
    try {
      const { password } = req.body;

      await authService.resetPassword(
        req.params.token,
        password
      );

      return res.status(200).json({
        success: true,
        message:
          "Password updated successfully",
      });
    } catch (error) {
     
      next(error)
    }
  };