import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    // teacherId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Teacher",
    //   required: true,
    // },

    testDate: {
      type: Date,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
    description: {
      type: String,
      trim: true,
      default: "",
    },

    duration: {
  type: Number,
  required: true,
}
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Test = mongoose.model("Test", testSchema);

export default Test;