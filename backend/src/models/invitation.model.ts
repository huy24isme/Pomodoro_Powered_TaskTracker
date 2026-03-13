import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInvitation extends Document {
  workspaceId: Types.ObjectId;
  invitedEmail: string;
  invitedBy: Types.ObjectId;
  role: "admin" | "member";
  status: "pending" | "accepted" | "declined" | "cancelled";
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const invitationSchema = new Schema<IInvitation>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    invitedEmail: { type: String, required: true, lowercase: true, trim: true },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled"],
      default: "pending",
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

invitationSchema.index({ workspaceId: 1 });
invitationSchema.index({ invitedEmail: 1 });
invitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL

export const Invitation = mongoose.model<IInvitation>("Invitation", invitationSchema);
