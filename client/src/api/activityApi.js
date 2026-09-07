import api from "./axios";

// ================= GET ACTIVITY STATS =================
export const getActivityStats = () => {
  return api.get("/activities/stats");
};

// ================= GET ALL ACTIVITIES =================
export const getActivities = (params) => {
  return api.get("/activities", {
    params,
  });
};

// ================= GET SINGLE ACTIVITY =================
export const getActivityById = (id) => {
  return api.get(`/activities/${id}`);
};

// ================= CREATE ACTIVITY =================
export const createActivity = (data) => {
  return api.post("/activities", data);
};

// ================= UPDATE ACTIVITY =================
export const updateActivity = (id, data) => {
  return api.put(`/activities/${id}`, data);
};

// ================= DELETE ACTIVITY =================
export const deleteActivity = (id) => {
  return api.delete(`/activities/${id}`);
};