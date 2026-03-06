import { Request, Response } from "express";
import { ConversionSchemaType } from "../validators/conversion-validators";
import ConversionModel from "../models/conversion-model";
import { HTTPSTATUS } from "../config/http-config";
import { ForbiddenException, InternalServerException, NotFoundException } from "../utils/app-error";



export const createConversionService = async (data: any, userId: string) => {
  try {
    const fileNum = await ConversionModel.countDocuments({userId});
   if (fileNum >= 50) {
    throw new ForbiddenException("Limit reached: You can only store 50 conversion records.")
   }
    const newConversion = await ConversionModel.create({
      ...data,
      userId,
    })
    return newConversion;
  } catch (e) {
    throw new InternalServerException("Internal Server Error");
  }
}