class TeacherService {

  constructor(teacherModel,userModel){
    this.Teacher=teacherModel,
    this.User=userModel
  }
  // ================= CREATE TEACHER =================
  async createTeacher(teacherData) {

    const {
      userId,
      employeeId,
      qualification,
      subjects,
      joinDate,
    } = teacherData;


    // Check user exists
    const user = await this.User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }


    // Check employee ID uniqueness
    const existingTeacher = await this.Teacher.findOne({
      employeeId,
    });

    if (existingTeacher) {
      const error = new Error(
        "Employee ID already exists"
      );

      error.statusCode = 400;
      throw error;
    }


    // Create teacher
    const teacher = await this.Teacher.create({
      userId,
      employeeId,
      qualification,
      subjects,
      joinDate,
    });


    return teacher;
  }


  // ================= GET ALL TEACHERS =================
  async getAllTeachers(queryParams) {

    const filter={};
  
    // search
    if(queryParams.search){
      filter.$or=[
        {
        qualification: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
      {
        subjects: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
      ]
    }


    // Qualification Filter
  if (queryParams.qualification) {
    filter.qualification = queryParams.qualification;
  }

  // Subject Filter
  if (queryParams.subject) {
    filter.subjects = queryParams.subject;
  }

   let query = this.Teacher.find(filter)
    .populate(
      "userId",
      "name email role profileImg"
    );

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
    query = query.sort("-createdAt");
  }

  const teachers = await query;
  const total = await this.Teacher.countDocuments(filter);
    
   return {
    teachers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
  }


  // ================= GET TEACHER BY ID =================
  async getTeacherById(teacherId) {

    const teacher = await this.Teacher.findById(teacherId)
      .populate(
        "userId",
        "name email role profileImg"
      );


    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }


    return teacher;
  }


  // ================= UPDATE TEACHER =================
  async updateTeacher(teacherId, teacherData) {

    // Check teacher exists
    const existingTeacher =
      await this.Teacher.findById(teacherId);

    if (!existingTeacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }


    const {
      userId,
      employeeId,
      qualification,
      subjects,
      joinDate,
    } = teacherData;


    // Check user if userId is being updated
    if (userId !== undefined) {

      const user = await this.User.findById(userId);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Check employee ID uniqueness
    if (
      employeeId !== undefined &&
      employeeId !== existingTeacher.employeeId
    ) {

      const duplicateTeacher =
        await Teacher.findOne({
          employeeId,
          _id: { $ne: teacherId },
        });


      if (duplicateTeacher) {
        const error = new Error(
          "Employee ID already exists"
        );

        error.statusCode = 400;
        throw error;
      }
    }


    // Build update object
    const updateData = {};

    if (userId !== undefined) {
      updateData.userId = userId;
    }

    if (employeeId !== undefined) {
      updateData.employeeId = employeeId;
    }

    if (qualification !== undefined) {
      updateData.qualification = qualification;
    }

    if (subjects !== undefined) {
      updateData.subjects = subjects;
    }

    if (joinDate !== undefined) {
      updateData.joinDate = joinDate;
    }


    // Update teacher
    const teacher =
      await this.Teacher.findByIdAndUpdate(
        teacherId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "userId",
        "name email role profileImg"
      );


    return teacher;
  }


  // ================= DELETE TEACHER =================
  async deleteTeacher(teacherId) {

    const teacher =
      await this.Teacher.findByIdAndDelete(teacherId);


    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }


    return teacher;
  }
}


export default TeacherService;