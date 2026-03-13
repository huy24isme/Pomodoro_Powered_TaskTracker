import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  boardId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  position: number;
  assignees: Types.ObjectId[];
  labels: string[];
  dueDate?: Date;
  pomodoroEstimate?: number;
  pomodorosCompleted: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    position: { type: Number, default: 0 },
    assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    labels: [{ type: String, trim: true }],
    dueDate: { type: Date },
    pomodoroEstimate: { type: Number },
    pomodorosCompleted: { type: Number, default: 0 },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

taskSchema.index({ boardId: 1, position: 1 });
taskSchema.index({ assignees: 1 });

export const Task = mongoose.model<ITask>("Task", taskSchema);
