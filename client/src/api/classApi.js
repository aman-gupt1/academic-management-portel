// api/classApi.js

import api from "./axios";

export const getClasses = async() => {
  return api.get("/classes");
};
export const getClassByID= async(id)=>{
  return api.get(`/classes/${id}`)
}

export const createClass=async (classData)=>{
  return api.post('/classes',classData)
}

export const updateClass= async(id,classData)=>{
  return api.put(`/classes/${id}`,classData)
}

export const deleteClass=async(id)=>{
  return api.delete(`/classes/${id}`)
}

export const getClassStats=async()=>{
  return api.get("/classes/stats")
}