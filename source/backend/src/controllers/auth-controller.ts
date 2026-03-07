import {Request, Response} from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { loginSchema, registerSchema } from "../validators/auth-validators";
import { clearJWTCookie, setJWTAuthCookie } from "../utils/cookie";
import { HTTPSTATUS } from "../config/http-config";
import { loginService, registerService } from "../services/auth-services";
import { NotFoundException } from "../utils/app-error";



export const registerController = asyncHandler(async(req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);

 const user = await registerService(body);
 const userId = user._id.toString();


 return setJWTAuthCookie({
  res, 
  userId,
 })
 .status(HTTPSTATUS.OK)
 .json({
  message: "User created & login successfully",
  user,
 })
});


export const loginController = asyncHandler(async(req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const user = await loginService(body);
  const userId = user._id.toString();
  return setJWTAuthCookie({
    res,
    userId,
  })
.status(HTTPSTATUS.OK)
.json({
  message: "User login successfully",
  user,
})
});


export const logoutController = asyncHandler(async(req: Request, res: Response) => {
  return clearJWTCookie(res).status(HTTPSTATUS.OK).json({
    message: "User logout successfully",
  })
})


export const authStatusController = asyncHandler(async(req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      success: false,
      message: "User not authenticated"
    })
  }
  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: "Authenticated User",
    data: {
      _id: user?._id,
      email: user?.email,
      createdAt: user?.createdAt,
      planType: user?.planType,
    }
  })
})