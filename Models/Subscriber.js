import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

export const Subscriber = mongoose.model("Subscriber", schema);
