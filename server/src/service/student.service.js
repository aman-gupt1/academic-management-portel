class StudentService {


  constructor(studentModel, userModel){
    this.Student=studentModel,
    this.User=userModel
  }
  // ================= CREATE STUDENT =================
  async createStudent(studentData) {

    const {
      userId,
      admissionNumber,
      rollNumber,
      classId,
      dateOfBirth,
      gender,
      parentName,
      address,
    } = studentData;


    // Check user exists
    const user = await this.User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }


    // Check duplicate admission number
    const existingStudent = await this.Student.findOne({
      admissionNumber,
    });

    if (existingStudent) {
      const error = new Error(
        "Admission number already exists"
      );

      error.statusCode = 400;
      throw error;
    }


    // Create student
    const student = await this.Student.create({
      userId,
      admissionNumber,
      rollNumber,
      classId,
      dateOfBirth,
      gender,
      parentName,
      address,
    });


    return student;
  }


  // ================= GET ALL STUDENTS =================
  async getAllStudents(queryParams) {

  const filter = {};

  // Search
  if (queryParams.search) {
    filter.$or = [
      {
        admissionNumber: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
      {
        rollNumber: {
          $regex: queryParams.search,
          $options: "i",
        },
      },
    ];
  }

  // Class Filter
  if (queryParams.classId) {
    filter.classId = queryParams.classId;
  }

  let query = this.Student.find(filter)
    .populate("userId", "name email phone role isActive")
    .populate("classId")


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

  const students = await query;

const total = await this.Student.countDocuments(filter);


    return {
      students,
      
       pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },

    };
  }


  // ================= GET STUDENT BY ID =================
  async getStudentById(studentId) {

    const student = await this.Student.findById(studentId)
      .populate("userId", "name email role")
      .populate("classId");


    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }


    return student;
  }


  // ================= UPDATE STUDENT =================
  async updateStudent(studentId, studentData) {

    // Check student exists
    const existingStudent =
      await this.Student.findById(studentId);

    if (!existingStudent) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }


    // If admission number is being updated,
    // check duplicate
    if (
      studentData.admissionNumber !== undefined &&
      studentData.admissionNumber !==
        existingStudent.admissionNumber
    ) {

      const duplicateStudent =
        await this.Student.findOne({
          admissionNumber:
            studentData.admissionNumber,
          _id: { $ne: studentId },
        });


      if (duplicateStudent) {
        const error = new Error(
          "Admission number already exists"
        );

        error.statusCode = 400;
        throw error;
      }
    }


    // Update student
    const student =
      await this.Student.findByIdAndUpdate(
        studentId,
        studentData,
        {
          new: true,
          runValidators: true,
        }
      );


    return student;
  }


  // ================= DELETE STUDENT =================
  async deleteStudent(studentId) {

    const student =
      await this.Student.findByIdAndDelete(studentId);


    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }


    return student;
  }

  // ============== GET STUDENT STATS ===========
  async getStudentStats(){

    const totalStudents = await this.Student.countDocuments();

    const activeStudents = await this.Student.countDocuments({
      isActive: true,
    });

    const currentYear = new Date().getFullYear();

    const newAdmissions = await this.Student.countDocuments({
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
      },
    });

    const graduatedStudents = await this.Student.countDocuments({
      status: "Graduated",
    });

    return {
      totalStudents,
      activeStudents,
      newAdmissions,
      graduatedStudents
    }

  }
}


export default StudentService;