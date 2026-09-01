class ClassService {


  // constructor
  constructor(classModel,teacherModel){
    this.Class=classModel,
    this.Teacher=teacherModel
  }

  // ================= CREATE CLASS =================
  async createClass(classData) {

    const {
      name,
      section,
      academicYear,
      classTeacherId,
    } = classData;

    // Check teacher exists
    const teacher = await this.Teacher.findById(classTeacherId);

    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }

    // Check duplicate class
    const existingClass = await this.Class.findOne({
      name,
      section,
      academicYear,
    });

    if (existingClass) {
      const error = new Error(
        "Class already exists for this academic year"
      );
      error.statusCode = 400;
      throw error;
    }

    // Create class
    const newClass = await this.Class.create({
      name,
      section,
      academicYear,
      classTeacherId,
    });

    return newClass;
  }


  // ================= GET ALL CLASSES =================
  async getAllClasses(queryParams) {
    const filter = {};

    if (queryParams.search) {
  filter.$or = [
    {
      name: {
        $regex: queryParams.search,
        $options: "i",
      },
    },
    {
      section: {
        $regex: queryParams.search,
        $options: "i",
      },
    },
    {
      academicYear: {
        $regex: queryParams.search,
        $options: "i",
      },
    },
  ];
}

if (queryParams.section) {
  filter.section = queryParams.section.toUpperCase();
}

if (queryParams.academicYear) {
  filter.academicYear = queryParams.academicYear;
}

if (queryParams.classTeacherId) {
  filter.classTeacherId = queryParams.classTeacherId;
}


    let query = this.Class.find(filter)
      .populate({
        path: "classTeacherId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });

let page = 1;
let limit = 10;

if (queryParams.all !== "true") {
  page = Number(queryParams.page) || 1;
  limit = Number(queryParams.limit) || 10;

  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
}
// sorting
if (queryParams.sort) {
  query = query.sort(queryParams.sort);
} else {
  query = query.sort("-createdAt");
}

   const classes = await query;
   const total = await this.Class.countDocuments(filter);

return {
  classes,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
};

  }


  // ================= GET CLASS BY ID =================
  async getClassById(classId) {

    const classData = await this.Class.findById(classId)
      .populate({
        path: "classTeacherId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });

    if (!classData) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    return classData;
  }


  // ================= UPDATE CLASS =================
  async updateClass(classId, classData) {

    // First check class exists
    const existingClass = await this.Class.findById(classId);

    if (!existingClass) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    const {
      name,
      section,
      academicYear,
      classTeacherId,
    } = classData;


    // Check teacher if provided
    if (classTeacherId !== undefined) {

      const teacher = await this.Teacher.findById(classTeacherId);

      if (!teacher) {
        const error = new Error("Teacher not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Build update object
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (section !== undefined) {
      updateData.section = section;
    }

    if (academicYear !== undefined) {
      updateData.academicYear = academicYear;
    }

    if (classTeacherId !== undefined) {
      updateData.classTeacherId = classTeacherId;
    }


    // Update class
    const updatedClass = await this.Class.findByIdAndUpdate(
      classId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "classTeacherId",
      populate: {
        path: "userId",
        select: "name email profileImg",
      },
    });

    return updatedClass;
  }


  // ================= DELETE CLASS =================
  async deleteClass(classId) {

    const deletedClass =
      await this.Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    return deletedClass;
  }
}

export default ClassService;