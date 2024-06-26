import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
});

export const Subscriber = mongoose.model("Subscriber", schema);
