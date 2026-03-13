import mongoose, { Schema, Document, Types } from "mongoose";

export interface INote extends Document {
  taskId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
  aiRewritten?: string;
  aiModel?: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    aiRewritten: { type: String },
    aiModel: { type: String },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true },
);

noteSchema.index({ taskId: 1, createdAt: -1 });

export const Note = mongoose.model<INote>("Note", noteSchema);
