import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPomodoroSession extends Document {
  userId: Types.ObjectId;
  taskId?: Types.ObjectId;
  workspaceId?: Types.ObjectId;
  type: "focus" | "short_break" | "long_break";
  duration: number;
  status: "running" | "completed" | "cancelled";
  startedAt: Date;
  endedAt?: Date;
  musicTrackId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const pomodoroSessionSchema = new Schema<IPomodoroSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
    type: { type: String, enum: ["focus", "short_break", "long_break"], required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ["running", "completed", "cancelled"], default: "running" },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    musicTrackId: { type: Schema.Types.ObjectId, ref: "MusicTrack" },
  },
  { timestamps: true },
);

pomodoroSessionSchema.index({ userId: 1, startedAt: -1 });
pomodoroSessionSchema.index({ taskId: 1 });
pomodoroSessionSchema.index({ workspaceId: 1 });

export const PomodoroSession = mongoose.model<IPomodoroSession>(
  "PomodoroSession",
  pomodoroSessionSchema,
);
