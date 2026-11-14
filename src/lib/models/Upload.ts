import mongoose, { Schema, Document } from "mongoose";

export interface IUpload extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
  size: number;
  createdAt: Date;
}

const UploadSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contentType: {
      type: String,
      required: true,
      default: "image/jpeg",
    },
    data: {
      type: Buffer,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Upload = mongoose.models.Upload || mongoose.model<IUpload>("Upload", UploadSchema);

export default Upload;
