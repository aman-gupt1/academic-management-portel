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
  async getAllResults(queryParams) {

    const filter = {};

    if (queryParams.studentId) {
  filter.studentId = queryParams.studentId;
    }

    if (queryParams.testId) {
      filter.testId = queryParams.testId;
    }

    if (queryParams.grade) {
      filter.grade = queryParams.grade;
    }

    if (queryParams.search) {
      filter.remarks = {
        $regex: queryParams.search,
        $options: "i",
      };
    }

    let query = this.Result.find(filter)
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



let page = 1;
let limit = 10;

if (queryParams.all !== "true") {
  page = Number(queryParams.page) || 1;
  limit = Number(queryParams.limit) || 10;

  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
}

if (queryParams.sort) {
  query = query.sort(queryParams.sort);
} else {
  query = query.sort("-createdAt");
}

const results = await query;

const total = await this.Result.countDocuments(filter);

return {
  results,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
};

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