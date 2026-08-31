import StudentService from "../service/student.service.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

const studentService = new StudentService(Student,User);


// ================= CREATE STUDENT =================
export const createStudent = async (req, res, next) => {
  try {

    const student =
      await studentService.createStudent(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });

  } catch (error) {

    next(error)
  }
};


// ================= GET ALL STUDENTS =================
export const getAllStudents = async (req, res, next) => {
  try {

    const students =
      await studentService.getAllStudents();

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });

  } catch (error) {

    next(error)

  }
};


// ================= GET STUDENT BY ID =================
export const getStudentById = async (req, res, next) => {
  try {

    const student =
      await studentService.getStudentById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: student,
    });

  } catch (error) {

    next(error)

  }
};


// ================= UPDATE STUDENT =================
export const updateStudent = async (req, res, next) => {
  try {

    const student =
      await studentService.updateStudent(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });

  } catch (error) {

    next(error)
  }
};


// ================= DELETE STUDENT =================
export const deleteStudent = async (req, res, next) => {
  try {

    await studentService.deleteStudent(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {

   next(error)

  }
};