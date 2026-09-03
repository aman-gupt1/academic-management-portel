// api/classApi.js

import api from "./axios";

export const getClasses = () => {
  return api.get("/classes");
};