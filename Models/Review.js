import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
  },
});

export const Review = mongoose.models.Review || model("Review", schema);
