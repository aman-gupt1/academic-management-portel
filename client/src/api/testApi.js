import api from "./axios";

export const createTest = async (data) => {
  return api.post("/tests", data);
};

export const getTests = async (params = {}) => {
  return api.get("/tests", { params });
};

export const getTestStats = async () => {
  return api.get("/tests/stats");
};

export const updateTest = async (id, data) => {
  return api.put(`/tests/${id}`, data);
};

export const deleteTest = async (id) => {
  return api.delete(`/tests/${id}`);
};