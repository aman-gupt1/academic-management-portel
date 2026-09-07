import api from "./axios";


export const getAttendanceStats = async() =>
  api.get("/attendance/stats");

export const getAttendance = async(params) =>
  api.get("/attendance", { params });

export const getAttendanceById = async(id) =>
  api.get(`/attendance/${id}`);

export const createAttendance = async (data) => {
  return api.post("/attendance", data);
};