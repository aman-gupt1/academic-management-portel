
import TestService from "../service/test.service.js";

import Test from "../models/Test.js";
import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";

const testService = new TestService(Test, Class, Teacher)

// Create Test
export const createTest = async (req, res, next) => {
  try {
    
    const test = await testService.createTest(req.body)
    return res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: test,
    });
  } catch (error) {
    next(error)
  }
};


// Get All Tests
export const getAllTests = async (req, res, next) => {
  try {
     const tests = await testService.getAllTests();

    return res.status(200).json({
      success: true,
      count: tests.length,
      data: tests,
    });
  } catch (error) {
    next(error)
  }
};


// Get Test By ID
export const getTestById = async (req, res, next) => {
  try {
    const test = await testService.getTestById(req.params.id);

    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (error) {
    next(error)
  }
};


// Update Test
export const updateTest = async (req, res, next) => {
  try {
    
  
  const test = await testService.updateTest(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Test updated successfully",
      data: test,
    });
  } catch (error) {
    next(error)
  }
};


// Delete Test
export const deleteTest = async (req, res, next) => {
  try {
    
     await testService.deleteTest(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    next(error)
  }
};