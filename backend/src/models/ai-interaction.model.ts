import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAiInteraction extends Document {
  userId: Types.ObjectId;
  taskId?: Types.ObjectId;
  provider: "openai" | "anthropic" | "google";
  action: "rewrite_note" | "summarize" | "suggest_tasks" | "chat";
  inputTokens?: number;
  outputTokens?: number;
  createdAt: Date;
}

const aiInteractionSchema = new Schema<IAiInteraction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
  provider: { type: String, enum: ["openai", "anthropic", "google"], required: true },
  action: {
    type: String,
    enum: ["rewrite_note", "summarize", "suggest_tasks", "chat"],
    required: true,
  },
  inputTokens: { type: Number },
  outputTokens: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

aiInteractionSchema.index({ userId: 1 });
aiInteractionSchema.index({ provider: 1 });

export const AiInteraction = mongoose.model<IAiInteraction>(
  "AiInteraction",
  aiInteractionSchema,
);
