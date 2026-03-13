import { MusicTrack } from "@models/music-track.model";
import { HttpError } from "@middlewares/error.middleware";

export const createTrack = async (
  userId: string,
  data: {
    title: string;
    fileUrl: string;
    fileSize?: number;
    mode?: string;
    durationSec?: number;
  },
) => {
  return MusicTrack.create({ ...data, userId });
};

export const getTracksByUser = async (userId: string) => {
  return MusicTrack.find({ userId }).sort({ createdAt: -1 });
};

export const getTrackById = async (id: string, userId: string) => {
  const track = await MusicTrack.findOne({ _id: id, userId });
  if (!track) {
    throw new HttpError("Music track not found", 404);
  }
  return track;
};

export const updateTrack = async (
  id: string,
  userId: string,
  data: { title?: string; mode?: string },
) => {
  const track = await getTrackById(id, userId);
  Object.assign(track, data);
  await track.save();
  return track;
};

export const deleteTrack = async (id: string, userId: string) => {
  const track = await getTrackById(id, userId);
  await track.deleteOne();
};
