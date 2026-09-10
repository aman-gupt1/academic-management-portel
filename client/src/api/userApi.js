import api from "./axios";

export const getAllUsers = async () => {
  return api.get("/users");
};

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

export const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};

export const updateUserRole = async (userId, role) => {
  return api.patch(`/users/${userId}/role`,{ role });
};

export const updateUserStatus = async (userId) => {
  return api.patch(
    `/users/${userId}/status`
  );

};