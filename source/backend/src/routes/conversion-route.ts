import {Router} from "express";
import { createConversion, deleteConversion, readAllConversions, readConversion } from "../controllers/conversion-controller";
import { protect } from "../middlewares/auth-middleware";


const conversionRoutes = Router();

conversionRoutes.use(protect);

conversionRoutes.post("/create-file", createConversion)
conversionRoutes.get("/read-all-files", readAllConversions)
conversionRoutes.get("/read-file/:id", readConversion)
conversionRoutes.delete("/delete-file/:id", deleteConversion)


export default conversionRoutes;