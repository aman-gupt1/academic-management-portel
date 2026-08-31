import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
    },

    classTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;