import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late"],
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// Prevent duplicate attendance for same student on same date
attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;