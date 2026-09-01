import TeacherService from "../service/teacher.service.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";

const teacherService = new TeacherService(Teacher,User);


// ================= CREATE TEACHER =================
export const createTeacher = async (req, res, next) => {
  try {

    const teacher =
      await teacherService.createTeacher(req.body);

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });

  } catch (error) {

    next(error)

  }
};


// ================= GET ALL TEACHERS =================
export const getAllTeachers = async (req, res, next) => {
  try {

  const result = await teacherService.getAllTeachers(req.query);

    return res.status(200).json({
      success: true,
      data: result.teachers,
      pagination: result.pagination,
    });

    
  } catch (error) {

    next(error)
  }
};


// ================= GET TEACHER BY ID =================
export const getTeacherById = async (req, res, next) => {
  try {

    const teacher =
      await teacherService.getTeacherById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: teacher,
    });

  } catch (error) {

   next(error)

  }
};


// ================= UPDATE TEACHER =================
export const updateTeacher = async (req, res, next) => {
  try {

    const teacher =
      await teacherService.updateTeacher(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });

  } catch (error) {

    next(error)

  }
};


// ================= DELETE TEACHER =================
export const deleteTeacher = async (req, res, next) => {
  try {

    await teacherService.deleteTeacher(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });

  } catch (error) {

    next(error)

  }
};