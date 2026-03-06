import { Router } from "express";
import authRoutes from "./auth-route";
import conversionRoutes from "./conversion-route";


const router = Router();
router.use("/auth", authRoutes);
router.use("/convert", conversionRoutes);


export default router;