import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  workspaceId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  replyTo?: Types.ObjectId;
  attachments: string[];
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    replyTo: { type: Schema.Types.ObjectId, ref: "Message" },
    attachments: [{ type: String }],
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true },
);

messageSchema.index({ workspaceId: 1, createdAt: -1 });

export const Message = mongoose.model<IMessage>("Message", messageSchema);
