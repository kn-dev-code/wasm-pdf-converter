import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./async-handler";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UnauthorizedException } from "../utils/app-error";
import { Env } from "../config/env-config";

export const protect = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

const token = req.cookies.accesstoken;

if (!token) throw new UnauthorizedException("Not authorized, please log in");

try {
const decoded = jwt.verify(token, Env.JWT_SECRET) as {userId: string};

req.user = {_id: new mongoose.Types.ObjectId(decoded.userId)} as any;

next();

} catch(e) {
throw new UnauthorizedException("Token has expires or is invalid, please try again");
}
})