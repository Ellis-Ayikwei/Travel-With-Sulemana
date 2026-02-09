import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: Date;
  image: string;
  featured: boolean;
  readTime: number; // in minutes
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Travel Tips', 'Guide', 'Culture', 'Adventure', 'Food', 'Photography', 'Other'],
    },
    author: {
      type: String,
      required: true,
      default: 'Sulemana',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
