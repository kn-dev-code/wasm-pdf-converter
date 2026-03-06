import {z} from "zod"
export const conversionSchema = z.object({
  fileName: z.string().min(1, "File name is required").trim(),
  file: z.string().url("Invalid file url").trim(),
  originalSize: z.number().positive(),
  operation: z.enum(["merge", "combine", "compress", "to_pdf"]),
  status: z.enum(["success", "failed", "pending"]).default("success")
})


export type ConversionSchemaType = z.infer<typeof conversionSchema>;