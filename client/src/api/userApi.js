import api from "./axios";

export const getStudentUsers = async() => {
  return api.get("/users?role=student");
};


export const getTeacherUsers = async () => {
  return api.get("/users?role=teacher");
};

export const changePassword = async (passwordData) => {
  return api.post("/users/change-password",passwordData);
};

export const getUserDistribution= async()=>{
  return api.get("/users/distribution");
}