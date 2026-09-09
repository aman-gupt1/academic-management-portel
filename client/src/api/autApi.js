import api from './axios'

export const login = async(credentials)=>{
   return  api.post("/auth/login",credentials)
}

export const logout = async()=>{
   return api.post("/auth/logout")
}

export const profile = async()=>{
   return api.get("users/profile");
}

export const registerUser= async(userData)=>{
   return api.post("auth/register",userData)
}

export const forgotPassword = async(email)=>{
   return api.post("/auth/forgot-password",{email})
}

export const resetPassword=async(token, password)=>{
   return api.post(`/auth/reset-password/${token}`,{password})
}