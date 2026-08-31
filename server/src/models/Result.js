import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    marksObtained: {
      type: Number,
      required: true,
      min: 0,
    },

    grade: {
      type: String,
      required: true,
      trim: true,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// One result per student per test
resultSchema.index(
  {
    testId: 1,
    studentId: 1,
  },
  {
    unique: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;