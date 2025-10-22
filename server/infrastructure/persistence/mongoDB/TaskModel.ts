import mongoose, { Document, Schema } from "mongoose";

export interface ITaskDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const schema = new Schema<ITaskDocument>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: false }
);

export default mongoose.model<ITaskDocument>("Task", schema);
