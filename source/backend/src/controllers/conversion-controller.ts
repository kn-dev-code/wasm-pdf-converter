import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { conversionSchema, ConversionSchemaType } from "../validators/conversion-validators";
import ConversionModel from "../models/conversion-model";
import { UnauthorizedException } from "../utils/app-error";
import mongoose from "mongoose";



export const createConversionController = asyncHandler(async(req: Request, res: Response) => {
const validatedConversion = conversionSchema.parse(req.body);
const userId = req.user?._id;

if (!userId) throw new UnauthorizedException("User not logged in");

const newFile = await ConversionModel.create({
  ...validatedConversion,
  userId: new mongoose.Types.ObjectId(userId as string),
})
})
