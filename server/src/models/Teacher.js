import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    subjects: [
      {
        type: String,
        trim: true,
      },
    ],

    joinDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;