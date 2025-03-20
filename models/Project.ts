import mongoose, { Schema, models, model } from 'mongoose';

export interface IProject {
  title: string;
  subtitle: string;
  image: string;
  category: string[];
  date: string;
  links: {
    github?: string;
    live?: string;
    dribbble?: string;
  };
  body: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for projects
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: [String],
      required: [true, 'At least one category is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    links: {
      github: String,
      live: String,
      dribbble: String,
    },
    body: {
      type: String,
      required: [true, 'Body content is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists to prevent recompilation during development hot reloads
export const Project = models.Project || model<IProject>('Project', projectSchema);
