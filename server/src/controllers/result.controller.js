import ResultService from "../service/result.service.js";
import Result from "../models/Result.js";
import Test from "../models/Test.js";
import Student from "../models/Student.js";

const resultService = new ResultService(Result, Test,Student);


// ================= CREATE RESULT =================
export const createResult = async (req, res, next) => {
  try {

    const result = await resultService.createResult(req.body);

    return res.status(201).json({
      success: true,
      message: "Result created successfully",
      data: result,
    });

  } catch (error) {
    next(error)
  }
};


// ================= GET ALL RESULTS =================
export const getAllResults = async (req, res, next) => {
  try {

    const result = await resultService.getAllResults(req.query);

    return res.status(200).json({
      success: true,
      data: result.results,
      pagination: result.pagination,
    });

  } catch (error) {

    next(error)

  }
};


// ================= GET RESULT BY ID =================
export const getResultById = async (req, res, next) => {
  try {

    const result =
      await resultService.getResultById(req.params.id);

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    next(error)

  }
};


// ================= UPDATE RESULT =================
export const updateResult = async (req, res, next) => {
  try {

    const result = await resultService.updateResult(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Result updated successfully",
      data: result,
    });

  } catch (error) {

    next(error)

  }
};


// ================= DELETE RESULT =================
export const deleteResult = async (req, res, next) => {
  try {

    await resultService.deleteResult(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });

  } catch (error) {

   next(error)
  }
};