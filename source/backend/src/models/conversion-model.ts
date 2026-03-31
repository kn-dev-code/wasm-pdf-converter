import mongoose, { Document, Schema } from "mongoose";


export interface ConversionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  originalSize: number;
  operation: "merge" | "combine" | "compress" | "split" | "to-pdf";
  status: "success" | "failed" | "pending";
}

const conversionSchema = new Schema<ConversionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    originalSize: { type: Number, required: true },
    operation: {
      type: String,
      enum: ["merge", "combine", "split", "compress", "to-pdf"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)


const ConversionModel = mongoose.model<ConversionDocument>("Conversion", conversionSchema);
export default ConversionModel;