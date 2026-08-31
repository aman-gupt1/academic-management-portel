class ResultService {

  // constructor  
  constructor(resultModel,testModel,studentModel){
    this.Result=resultModel,
    this.Test=testModel,
    this.Student=studentModel
  }

  // ================= CREATE RESULT =================
  async createResult(resultData) {

    const {
      testId,
      studentId,
      marksObtained,
      grade,
      remarks,
    } = resultData;


    // Check test exists
    const test = await this.Test.findById(testId);

    if (!test) {
      const error = new Error("Test not found");
      error.statusCode = 404;
      throw error;
    }


    // Check student exists
    const student = await this.Student.findById(studentId);

    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }


    // Check marks
    if (marksObtained > test.totalMarks) {
      const error = new Error(
        `Marks obtained cannot be greater than total marks (${test.totalMarks})`
      );

      error.statusCode = 400;
      throw error;
    }


    // Check duplicate result
    const existingResult = await this.Result.findOne({
      testId,
      studentId,
    });

    if (existingResult) {
      const error = new Error(
        "Result already exists for this student and test"
      );

      error.statusCode = 400;
      throw error;
    }


    // Create result
    const result = await this.Result.create({
      testId,
      studentId,
      marksObtained,
      grade,
      remarks,
    });


    return result;
  }


  // ================= GET ALL RESULTS =================
  async getAllResults() {

    const results = await this.Result.find()
      .populate({
        path: "testId",
        populate: {
          path: "classId",
        },
      })
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      })
      .sort({ createdAt: -1 });


    return results;
  }


  // ================= GET RESULT BY ID =================
  async getResultById(resultId) {

    const result = await this.Result.findById(resultId)
      .populate({
        path: "testId",
        populate: {
          path: "classId",
        },
      })
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });


    if (!result) {
      const error = new Error("Result not found");
      error.statusCode = 404;
      throw error;
    }


    return result;
  }


  // ================= UPDATE RESULT =================
  async updateResult(resultId, resultData) {

    // First check result exists
    const existingResult = await this.Result.findById(resultId);

    if (!existingResult) {
      const error = new Error("Result not found");
      error.statusCode = 404;
      throw error;
    }


    const {
      testId,
      studentId,
      marksObtained,
      grade,
      remarks,
    } = resultData;


    // --------------------------------
    // Determine test
    // --------------------------------

    const finalTestId =
      testId !== undefined
        ? testId
        : existingResult.testId;


    // Check test exists
    const test = await this.Test.findById(finalTestId);

    if (!test) {
      const error = new Error("Test not found");
      error.statusCode = 404;
      throw error;
    }


    // --------------------------------
    // Determine student
    // --------------------------------

    const finalStudentId =
      studentId !== undefined
        ? studentId
        : existingResult.studentId;


    // Check student exists
    const student =
      await this.Student.findById(finalStudentId);

    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }


    // --------------------------------
    // Determine marks
    // --------------------------------

    const finalMarks =
      marksObtained !== undefined
        ? marksObtained
        : existingResult.marksObtained;


    // Check marks
    if (finalMarks > test.totalMarks) {

      const error = new Error(
        `Marks obtained cannot be greater than total marks (${test.totalMarks})`
      );

      error.statusCode = 400;
      throw error;
    }


    // --------------------------------
    // Check duplicate result
    // --------------------------------

    if (
      testId !== undefined ||
      studentId !== undefined
    ) {

      const duplicateResult = await this.Result.findOne({
        testId: finalTestId,
        studentId: finalStudentId,
        _id: { $ne: resultId },
      });

      if (duplicateResult) {

        const error = new Error(
          "Result already exists for this student and test"
        );

        error.statusCode = 400;
        throw error;
      }
    }


    // --------------------------------
    // Build update object
    // --------------------------------

    const updateData = {};


    if (testId !== undefined) {
      updateData.testId = testId;
    }

    if (studentId !== undefined) {
      updateData.studentId = studentId;
    }

    if (marksObtained !== undefined) {
      updateData.marksObtained = marksObtained;
    }

    if (grade !== undefined) {
      updateData.grade = grade;
    }

    if (remarks !== undefined) {
      updateData.remarks = remarks;
    }


    // Update result
    const result = await this.Result.findByIdAndUpdate(
      resultId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );


    return result;
  }


  // ================= DELETE RESULT =================
  async deleteResult(resultId) {

    const result =
      await this.Result.findByIdAndDelete(resultId);


    if (!result) {
      const error = new Error("Result not found");
      error.statusCode = 404;
      throw error;
    }


    return result;
  }
}


export default ResultService;