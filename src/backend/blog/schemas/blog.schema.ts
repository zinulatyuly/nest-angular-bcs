import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    body: String,
    datePosted: Date,
  },
  {
    versionKey: false,
  },
);
