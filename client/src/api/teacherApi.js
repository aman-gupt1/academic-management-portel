import api from './axios'

export const getTeachers=async()=>{
return api.get("/teachers")
}

export const getTeacherByID=(id)=>{
return api.get(`/teachers/${id}`)
}

export const createTeacher=async(teacherData)=>{
return api.post('/teachers',teacherData)
}

export const updateTeacher=async(id, studentData)=>{
return api.put(`/teachers/${id}`,studentData)
}

export const deleteTeacher=async(id)=>{
return api.delete(`/teachers/${id}`)
}
export const getTeacherStats=async()=>{
 return api.get("/teachers/stats");
}
