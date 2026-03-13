import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkspaceMember {
  userId: Types.ObjectId;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

export interface IWorkspace extends Document {
  name: string;
  ownerId: Types.ObjectId;
  members: IWorkspaceMember[];
  inviteCode: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: ["owner", "admin", "member"], default: "member" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    inviteCode: { type: String, unique: true },
    description: { type: String, trim: true },
  },
  { timestamps: true },
);

workspaceSchema.index({ ownerId: 1 });
workspaceSchema.index({ inviteCode: 1 });
workspaceSchema.index({ "members.userId": 1 });

export const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
