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