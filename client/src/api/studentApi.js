import api from './axios'

// Get all students
export const getStudents = async (page = 1, limit = 10) => {
  return api.get(`/students?page=${page}&limit=${limit}`);
};

// Get single student
export const getStudentById = async (id) => {
  return api.get(`/students/${id}`);
};

// Create student
export const createStudent = async (studentData) => {
  return api.post("/students", studentData);
};

// Update student
export const updateStudent = async (id, studentData) => {
  return api.put(`/students/${id}`, studentData);
};

// Delete student
export const deleteStudent = async (id) => {
  return api.delete(`/students/${id}`);
};


// Get Student Stats
export const getStudentStats=async()=>{
return api.get('/students/stats')
}