class ActivityService {
  constructor(activityModel) {
    this.Activity = activityModel;
  }

  // ================= CREATE ACTIVITY =================
  async createActivity(activityData) {
    const activity = await this.Activity.create({
      title: activityData.title,
      type: activityData.type,
      date: activityData.date,
      venue: activityData.venue,
      participants: activityData.participants || 0,
      description: activityData.description || "",
      status: activityData.status || "Upcoming",
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
          venue: {
            $regex: queryParams.search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: queryParams.search,
            $options: "i",
          },
        },
      ];
    }

    // Type Filter
    if (queryParams.type) {
      filter.type = queryParams.type;
    }

    // Status Filter
    if (queryParams.status) {
      filter.status = queryParams.status;
    }

    let query = this.Activity.find(filter);

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

    const total =
      await this.Activity.countDocuments(filter);

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
    const activity =
      await this.Activity.findById(activityId);

    if (!activity) {
      const error = new Error(
        "Activity not found"
      );
      error.statusCode = 404;
      throw error;
    }

    return activity;
  }

  // ================= UPDATE ACTIVITY =================
  async updateActivity(activityId, activityData) {
    const activity =
      await this.Activity.findById(activityId);

    if (!activity) {
      const error = new Error(
        "Activity not found"
      );
      error.statusCode = 404;
      throw error;
    }

    const updatedActivity =
      await this.Activity.findByIdAndUpdate(
        activityId,
        activityData,
        {
          new: true,
          runValidators: true,
        }
      );

    return updatedActivity;
  }

  // ================= DELETE ACTIVITY =================
  async deleteActivity(activityId) {
    const activity =
      await this.Activity.findByIdAndDelete(
        activityId
      );

    if (!activity) {
      const error = new Error(
        "Activity not found"
      );
      error.statusCode = 404;
      throw error;
    }

    return activity;
  }

  // ================= GET ACTIVITY STATS =================
  async getActivityStats() {
    const totalActivities =
      await this.Activity.countDocuments();

    const upcomingEvents =
      await this.Activity.countDocuments({
        status: "Upcoming",
      });

    const completedEvents =
      await this.Activity.countDocuments({
        status: "Completed",
      });

    const participantsResult =
      await this.Activity.aggregate([
        {
          $group: {
            _id: null,
            totalParticipants: {
              $sum: "$participants",
            },
          },
        },
      ]);

    return {
      totalActivities,
      upcomingEvents,
      completedEvents,
      participants:
        participantsResult[0]
          ?.totalParticipants || 0,
    };
  }
}

export default ActivityService;