import api from "./axios"

export const getDashboardStats= async()=>{
    return api.get("/dashboard/stats")
}