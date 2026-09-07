import api from "./axios";

export const getStudentUsers = () => {
  return api.get("/users?role=student");
};


export const getTeacherUsers = async () => {
  return api.get("/users?role=teacher");
};