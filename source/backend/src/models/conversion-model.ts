import mongoose, { Document, Schema } from "mongoose";


export interface ConversionDocument extends Document {
  userId: mongoose.Types.ObjectId,
  fileName: string;
  originalSize: number;
  operation: "merge" | "combine" | "compress" | "to-pdf";
  status: "success" | "failed";
}


const conversionSchema = new Schema<ConversionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    originalSize: { type: Number, required: true },
    operation: {
      type: String,
      enum: ["merge", "combine", "compress", "to-pdf"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
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