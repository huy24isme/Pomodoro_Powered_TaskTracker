import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  displayName: string;
  avatarUrl?: string;
  authProvider: "local" | "google";
  googleId?: string;
  preferences: {
    defaultFocusDuration: number;
    defaultShortBreak: number;
    defaultLongBreak: number;
    pomodorosUntilLongBreak: number;
    theme: "light" | "dark" | "system";
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, sparse: true },
    preferences: {
      defaultFocusDuration: { type: Number, default: 25 },
      defaultShortBreak: { type: Number, default: 5 },
      defaultLongBreak: { type: Number, default: 15 },
      pomodorosUntilLongBreak: { type: Number, default: 4 },
      theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

userSchema.set("toJSON", {
  transform(_doc, ret) {
    const { passwordHash, __v, ...rest } = ret;
    return rest;
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
