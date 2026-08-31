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
  async getAllClasses() {

    const classes = await this.Class.find()
      .populate({
        path: "classTeacherId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });

    return classes;
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