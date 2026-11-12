import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  slug: string;
  title: string;
  subtitle?: string;
  date?: string;
  author?: string;
  image?: string;
  summary?: string;
  metaTitle?: string;
  metaDescription?: string;
  paragraphs: string[];
  status: "Published" | "Draft" | "Deleted";
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: String,
      trim: true,
      default: "",
    },
    author: {
      type: String,
      trim: true,
      default: "AÉRI Team",
    },
    image: {
      type: String,
      default: "/hero-makhana-bag.webp",
    },
    summary: {
      type: String,
      trim: true,
      default: "",
    },
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },
    paragraphs: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Published", "Draft", "Deleted"],
      default: "Published",
    },
  },
  { timestamps: true }
);

const Article = mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
