import { Router } from "express";
import authRoutes from "./auth-route";
import conversionRoutes from "./conversion-route";


const mainRouter = Router();
mainRouter.use("/auth", authRoutes);
mainRouter.use("/convert", conversionRoutes);


export default mainRouter;