import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { conversionSchema} from "../validators/conversion-validators";
import ConversionModel from "../models/conversion-model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import mongoose from "mongoose";
import { HTTPSTATUS } from "../config/http-config";
import { createConversionService } from "../services/conversion-services";



export const createConversion = asyncHandler(async(req: Request, res: Response) => {
  const validatedData = conversionSchema.parse(req.body);
  if (!req.user) throw new UnauthorizedException("User not logged in");
  const newFile = await createConversionService(validatedData, req.user);

  return res.status(HTTPSTATUS.CREATED).json({
    success: true,
    message: "File conversion successfully created",
    data: newFile,
  });
});


export const readAllConversions = asyncHandler(async(req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) throw new UnauthorizedException("User not logged in");

  const findConversions = await ConversionModel.find({userId}).sort({createdAt: -1})
  return res.status(HTTPSTATUS.OK).json({
    success: true,
    count: findConversions.length,
    data: findConversions,
  })
})


export const readConversion = asyncHandler(async(req: Request, res: Response) => {
const {id} = req.params;
const userId = req.user?._id;
if (!userId) throw new UnauthorizedException("User not logged in");
const findConversion = await ConversionModel.findOne({_id: id, userId});
if (!findConversion) throw new NotFoundException("File not found");
return res.status(HTTPSTATUS.OK).json({
  success: true,
  data: findConversion,
})
})

export const deleteConversion = asyncHandler(async(req: Request, res: Response) => {
const {id} = req.params;
const userId = req.user?._id;
const deleteConversion = await ConversionModel.findOneAndDelete({_id: id, userId});
if (!deleteConversion) throw new NotFoundException("File not found");

return res.status(HTTPSTATUS.OK).json({
  success: true,
  message: "File successfully deleted",
})
})