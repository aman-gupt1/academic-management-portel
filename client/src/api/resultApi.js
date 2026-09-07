import axiosInstance from "./axios";

// ================= GET RESULT STATS =================
export const getResultStats = () => {
  return axiosInstance.get("/results/stats");
};

// ================= GET ALL RESULTS =================
export const getResults = (params) => {
  return axiosInstance.get("/results", {
    params,
  });
};

// ================= GET SINGLE RESULT =================
export const getResultById = (id) => {
  return axiosInstance.get(`/results/${id}`);
};

// ================= CREATE RESULT =================
export const createResult = (data) => {
  return axiosInstance.post("/results", data);
};

// ================= UPDATE RESULT =================
export const updateResult = (id, data) => {
  return axiosInstance.put(`/results/${id}`, data);
};

// ================= DELETE RESULT =================
export const deleteResult = (id) => {
  return axiosInstance.delete(`/results/${id}`);
};