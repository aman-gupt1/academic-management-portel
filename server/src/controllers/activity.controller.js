import ActivityService from "../service/activity.service.js";
import Activity from "../models/Activity.js";
import Student from "../models/Student.js";

const activityService = new ActivityService(Activity,Student);

// Create Activity
export const createActivity = async (req, res, next) => {
  try {
    const activity=await activityService.createActivity(req.body)
    

    return res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: activity,
    });
  } catch (error) {
    next(error)
  }
};


// Get All Activities
export const getAllActivities = async (req, res, next) => {
  try {
    const activities =await activityService.getAllActivities(req.query);

    return res.status(200).json({
      success: true,
      count: result.activities.length,
      data: result.activities,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error)
  }
};


// Get Activity By ID
export const getActivityById = async (req, res, next) => {
  try {
    const activity = await activityService.getActivityById(req.params.id);

  
    return res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    next(error)
  }
};


// Update Activity
export const updateActivity = async (req, res, next) => {
  try {
    const activity = await activityService.updateActivity(req.params.id,req.body);
          
    return res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      data: activity,
    });
  } catch (error) {
    next(error)
  }
};


// Delete Activity
export const deleteActivity = async (req, res, next) => {
  try {
    await activityService.deleteActivity(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
    });
  } catch (error) {
    next(error)
  }
};