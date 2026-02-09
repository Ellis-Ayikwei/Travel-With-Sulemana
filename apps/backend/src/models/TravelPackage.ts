import mongoose, { Schema, Document } from 'mongoose';

export interface ITravelPackage extends Document {
  name: string;
  description: string;
  destination: string;
  duration: number; // in days
  price: number;
  maxTravelers: number;
  currentBookings: number;
  highlights: string[];
  images: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

const travelPackageSchema = new Schema<ITravelPackage>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    maxTravelers: {
      type: Number,
      required: true,
      min: 1,
    },
    currentBookings: {
      type: Number,
      default: 0,
      min: 0,
    },
    highlights: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const TravelPackage = mongoose.model<ITravelPackage>(
  'TravelPackage',
  travelPackageSchema
);
