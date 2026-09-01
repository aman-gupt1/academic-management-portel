
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
  async getAllActivities(queryParams) {
      const filter = {};

      // Search
  if (queryParams.search) {
    filter.$or = [
      {
        title: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
      {
        achievement: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
      {
        certification: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
    ];
  }

  // Category Filter
  if (queryParams.category) {
    filter.category = queryParams.category;
  }

  // Student Filter
  if (queryParams.studentId) {
    filter.studentId = queryParams.studentId;
  }

  let query = this.Activity.find(filter)
    .populate({
      path: "studentId",
      populate: {
        path: "userId",
        select: "name email",
      },
    });

    // Pagination
  let page = 1;
  let limit = 10;


    if (queryParams.all !== "true") {
    page = Number(queryParams.page) || 1;
    limit = Number(queryParams.limit) || 10;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
  }

  // Sorting
  if (queryParams.sort) {
    query = query.sort(queryParams.sort);
  } else {
    query = query.sort("-date");
  }

  const activities = await query;

  const total = await this.Activity.countDocuments(filter);


    return {
    activities,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

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