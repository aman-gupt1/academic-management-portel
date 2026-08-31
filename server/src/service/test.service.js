import Test from "../models/Test.js";
import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";

class TestService {

  constructor(testModel,classModel, teacherModel){
    this.Test=testModel,
    this.Class=classModel,
    this.Teacher=teacherModel
  }

  // ================= CREATE TEST =================
  async createTest(testData) {

    const {
      title,
      subject,
      classId,
      teacherId,
      testDate,
      totalMarks,
      description,
    } = testData;

    // Check class
    const classData = await this.Class.findById(classId);

    if (!classData) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    // Check teacher
    const teacher = await this.Teacher.findById(teacherId);

    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }

    // Create test
    const test = await this.Test.create({
      title,
      subject,
      classId,
      teacherId,
      testDate,
      totalMarks,
      description,
    });

    return test;
  }


  // ================= GET ALL TESTS =================
  async getAllTests() {

    const tests = await this.Test.find()
      .populate("classId")
      .populate({
        path: "teacherId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      })
      .sort({ testDate: -1 });

    return tests;
  }


  // ================= GET TEST BY ID =================
  async getTestById(testId) {

    const test = await this.Test.findById(testId)
      .populate("classId")
      .populate({
        path: "teacherId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });

    if (!test) {
      const error = new Error("Test not found");
      error.statusCode = 404;
      throw error;
    }

    return test;
  }


  // ================= UPDATE TEST =================
  async updateTest(testId, testData) {

    const {
      title,
      subject,
      classId,
      teacherId,
      testDate,
      totalMarks,
      description,
    } = testData;


    // Check class if provided
    if (classId !== undefined) {

      const classData = await this.Class.findById(classId);

      if (!classData) {
        const error = new Error("Class not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Check teacher if provided
    if (teacherId !== undefined) {

      const teacher = await this.Teacher.findById(teacherId);

      if (!teacher) {
        const error = new Error("Teacher not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Build update object
    const updateData = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (subject !== undefined) {
      updateData.subject = subject;
    }

    if (classId !== undefined) {
      updateData.classId = classId;
    }

    if (teacherId !== undefined) {
      updateData.teacherId = teacherId;
    }

    if (testDate !== undefined) {
      updateData.testDate = testDate;
    }

    if (totalMarks !== undefined) {
      updateData.totalMarks = totalMarks;
    }

    if (description !== undefined) {
      updateData.description = description;
    }


    const test = await this.Test.findByIdAndUpdate(
      testId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("classId")
      .populate({
        path: "teacherId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });


    if (!test) {
      const error = new Error("Test not found");
      error.statusCode = 404;
      throw error;
    }

    return test;
  }


  // ================= DELETE TEST =================
  async deleteTest(testId) {

    const test = await this.Test.findByIdAndDelete(testId);

    if (!test) {
      const error = new Error("Test not found");
      error.statusCode = 404;
      throw error;
    }

    return test;
  }
}

export default TestService;