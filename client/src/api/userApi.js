import api from "./axios";

export const getStudentUsers = () => {
  return api.get("/users?role=student");
};