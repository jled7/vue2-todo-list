import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: false }
);

export default mongoose.model("Task", schema);
