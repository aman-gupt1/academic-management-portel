import AttendanceService from "../service/attendance.service.js";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Classs from '../models/Class.js';
import Teacher from '../models/Teacher.js'

const attendanceService = new AttendanceService(Attendance, Student, Classs,Teacher);

// Create Attendance
export const createAttendance = async (req, res, next) => {
  try {
    
     const attendance = await attendanceService.createAttendance(req.body);

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    next(error)
  }
};


// Get All Attendance
export const getAllAttendance = async (req, res, next) => {
  try {
    const attendance =await attendanceService.getAllAttendance();
     

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    next(error)
  }
};


// Get Attendance By ID
export const getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.id);

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error)
  }
};


// Update Attendance
export const updateAttendance = async (req, res, next) => {
  try {
   
    const attendance =
      await attendanceService.updateAttendance(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    next(error)
  }
};


// Delete Attendance
export const deleteAttendance = async (req, res, next) => {
  try {

    await attendanceService.deleteAttendance(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });

  } catch (error) {

    next(error)

  }
};