import ClassService from "../service/class.service.js";
import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";

const classService = new ClassService(Class,Teacher);


// ================= CREATE CLASS =================
export const createClass = async (req, res, next) => {
  try {

    const newClass =
      await classService.createClass(req.body);

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });

  } catch (error) {

    next(error)
  }
};


// ================= GET ALL CLASSES =================
export const getAllClasses = async (req, res, next) => {
  try {

const result = await classService.getAllClasses(req.query);
return res.status(200).json({
  success: true,
  data: result.classes,
  pagination: result.pagination,
});
  } catch (error) {

    next(error)
  }
};


// ================= GET CLASS BY ID =================
export const getClassById = async (req, res, next) => {
  try {

    const classData =
      await classService.getClassById(req.params.id);

    return res.status(200).json({
      success: true,
      data: classData,
    });

  } catch (error) {

    next(error)
  }
};


// ================= UPDATE CLASS =================
export const updateClass = async (req, res, next) => {
  try {

    const updatedClass =
      await classService.updateClass(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });

  } catch (error) {

    next(error)
  }
};


// ================= DELETE CLASS =================
export const deleteClass = async (req, res, next) => {
  try {

    await classService.deleteClass(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });

  } catch (error) {

    next(error)

  }
};