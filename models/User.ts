import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  providerId: string;
  stats: {
    testsCompleted: number;
    bestWpm: number;
    avgAccuracy: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    providerId: { type: String, required: true },
    stats: {
      testsCompleted: { type: Number, default: 0 },
      bestWpm: { type: Number, default: 0 },
      avgAccuracy: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<IUser>('User', UserSchema);
