import DashboardService from "../service/dashboard.service.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import Activity from "../models/Activity.js";

const dashboardService= new DashboardService(Student,Teacher,Class,Test, Result,Activity)

export const getDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboardStats();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};