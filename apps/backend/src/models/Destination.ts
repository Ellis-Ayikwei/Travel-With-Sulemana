import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  region: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<IDestination>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    highlights: [
      {
        type: String,
      },
    ],
    bestTimeToVisit: {
      type: String,
      default: 'Year-round',
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Destination = mongoose.model<IDestination>(
  'Destination',
  destinationSchema
);
