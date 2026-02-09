import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  name: string;
  category: string;
  region: string;
  description: string;
  startDate: Date;
  duration: string; // e.g., "7 Days"
  groupSize: string; // e.g., "8-12 Guests"
  price: number;
  availability: number;
  tag: string;
  highlights: string[];
  image: string;
  icon?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Adventure', 'Culture', 'History', 'Leisure', 'Creative', 'Food', 'Photography'],
    },
    region: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    groupSize: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Number,
      required: true,
      min: 0,
    },
    tag: {
      type: String,
      required: true,
    },
    highlights: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Experience = mongoose.model<IExperience>('Experience', experienceSchema);
