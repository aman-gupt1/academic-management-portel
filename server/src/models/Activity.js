import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Sports",
        "Cultural",
        "Academic",
        "Competition",
        "Workshop",
        "Seminar",
        "Other",
      ],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    achievement: {
      type: String,
      trim: true,
      default: "",
    },

    certification: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;