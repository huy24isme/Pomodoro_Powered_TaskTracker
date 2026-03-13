import mongoose, { Schema, Document, Types } from "mongoose";

export interface IActivityLog extends Document {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  action: string;
  targetType: string;
  targetId: Types.ObjectId;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  targetType: { type: String, required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

activityLogSchema.index({ workspaceId: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 }); // TTL 90 days

export const ActivityLog = mongoose.model<IActivityLog>("ActivityLog", activityLogSchema);
