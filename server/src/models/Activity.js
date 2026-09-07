import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Sports",
        "Academic",
        "Cultural",
        "Competition",
        "Other",
      ],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    participants: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Completed",
      ],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);


const Activity = mongoose.model(
  "Activity",
  activitySchema
);

export default Activity;
