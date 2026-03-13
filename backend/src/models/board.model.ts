import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBoard extends Document {
  workspaceId: Types.ObjectId;
  name: string;
  position: number;
  color?: string;
  type: "kanban" | "list" | "calendar";
  isArchived: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const boardSchema = new Schema<IBoard>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    name: { type: String, required: true, trim: true },
    position: { type: Number, default: 0 },
    color: { type: String },
    type: { type: String, enum: ["kanban", "list", "calendar"], default: "kanban" },
    isArchived: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

boardSchema.index({ workspaceId: 1, position: 1 });

export const Board = mongoose.model<IBoard>("Board", boardSchema);
