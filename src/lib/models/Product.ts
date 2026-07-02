import mongoose, { Schema, Document, Model } from "mongoose";

/* Product Model - AÉRI Admin Dashboard */

export interface IProduct extends Document {
  name: string;          // English name (primary)
  nameEn?: string;       // Explicit English name (optional, fallback to name)
  nameFr?: string;       // French name
  slug: string;
  description: string;         // English description (primary)
  descriptionEn?: string;      // Explicit English description
  descriptionFr?: string;      // French description
  shortDescription: string;    // English short description (primary)
  shortDescriptionEn?: string; // Explicit English short description
  shortDescriptionFr?: string; // French short description
  sku: string;
  category: string;
  productType: "B2B" | "B2C" | "Both";
  price: number;
  priceINR?: number;
  discountPrice?: number;
  discountPriceINR?: number;
  costPrice?: number;
  stockQuantity: number;
  weight?: string;
  dimensions?: string;
  status: "Active" | "Draft" | "Archived";
  featured: boolean;
  tags: string[];
  images: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },       // English name (primary)
    nameEn: { type: String, default: "" },         // Explicit English name
    nameFr: { type: String, default: "" },         // French name
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },         // English description
    descriptionEn: { type: String, default: "" },        // Explicit English description
    descriptionFr: { type: String, default: "" },        // French description
    shortDescription: { type: String, default: "" },     // English short description
    shortDescriptionEn: { type: String, default: "" },   // Explicit English short description
    shortDescriptionFr: { type: String, default: "" },   // French short description
    sku: { type: String, required: true, unique: true },
    category: { type: String, default: "Uncategorized" },
    productType: {
      type: String,
      enum: ["B2B", "B2C", "Both"],
      default: "B2C",
    },
    price: { type: Number, required: true },
    priceINR: { type: Number, default: 65 }, // Client requested default 65 for India
    discountPrice: { type: Number },
    discountPriceINR: { type: Number },
    costPrice: { type: Number },
    stockQuantity: { type: Number, default: 0 },
    weight: { type: String },
    dimensions: { type: String },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Draft",
    },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    images: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

/* Model reuse karo agar already compiled hai */
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
