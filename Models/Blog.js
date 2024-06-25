import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  steps: [
    {
      title: String,
      points: [String],
      image: String,
      description: String,
    },
  ],
});

export const Blog = mongoose.model("Blog", schema);
