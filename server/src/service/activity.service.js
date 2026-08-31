
class ActivityService {


  constructor(activityModel, studentModel){
    this.Activity=activityModel,
    this.Student=studentModel
  }
  // ================= CREATE ACTIVITY =================
  async createActivity(activityData) {

    const {
      studentId,
      title,
      category,
      description,
      date,
      achievement,
      certification,
    } = activityData;

    // Check student exists
    const student = await this.Student.findById(studentId);

    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    // Create activity
    const activity = await this.Activity.create({
      studentId,
      title,
      category,
      description,
      date,
      achievement,
      certification,
    });

    return activity;
  }


  // ================= GET ALL ACTIVITIES =================
  async getAllActivities() {

    const activities = await this.Activity.find()
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      })
      .sort({ date: -1 });

    return activities;
  }


  // ================= GET ACTIVITY BY ID =================
  async getActivityById(activityId) {

    const activity = await this.Activity.findById(activityId)
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });

    if (!activity) {
      const error = new Error("Activity not found");
      error.statusCode = 404;
      throw error;
    }

    return activity;
  }


  // ================= UPDATE ACTIVITY =================
 async updateActivity(activityId, activityData) {

  // Check activity exists
  const activity = await this.Activity.findById(activityId);

  if (!activity) {
    const error = new Error("Activity not found");
    error.statusCode = 404;
    throw error;
  }

  const {
    studentId,
    title,
    category,
    description,
    date,
    achievement,
    certification,
  } = activityData;

  // Check student if provided
  if (studentId !== undefined) {

    const student = await this.Student.findById(studentId);

    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // Create update object
  const updateData = {};

  if (studentId !== undefined) {
    updateData.studentId = studentId;
  }

  if (title !== undefined) {
    updateData.title = title;
  }

  if (category !== undefined) {
    updateData.category = category;
  }

  if (description !== undefined) {
    updateData.description = description;
  }

  if (date !== undefined) {
    updateData.date = date;
  }

  if (achievement !== undefined) {
    updateData.achievement = achievement;
  }

  if (certification !== undefined) {
    updateData.certification = certification;
  }

  const updatedActivity = await this.Activity.findByIdAndUpdate(
    activityId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedActivity;
}

  // ================= DELETE ACTIVITY =================
  async deleteActivity(activityId) {

    const activity = await this.Activity.findByIdAndDelete(activityId);

    if (!activity) {
      const error = new Error("Activity not found");
      error.statusCode = 404;
      throw error;
    }

    return activity;
  }
}

export default ActivityService;