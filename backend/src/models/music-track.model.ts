import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMusicTrack extends Document {
  userId: Types.ObjectId;
  title: string;
  fileUrl: string;
  fileSize?: number;
  mode: "focus" | "break" | "ambient";
  durationSec?: number;
  createdAt: Date;
  updatedAt: Date;
}

const musicTrackSchema = new Schema<IMusicTrack>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number },
    mode: { type: String, enum: ["focus", "break", "ambient"], default: "focus" },
    durationSec: { type: Number },
  },
  { timestamps: true },
);

musicTrackSchema.index({ userId: 1, mode: 1 });

export const MusicTrack = mongoose.model<IMusicTrack>("MusicTrack", musicTrackSchema);
