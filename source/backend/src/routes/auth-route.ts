import {Router} from "express"
import { loginController, registerController, authStatusController, logoutController} from "../controllers/auth-controller"
import { protect } from "../middlewares/auth-middleware";


const authRoutes = Router()
.post("/register", registerController)
.post("/login", loginController)
.post("/logout", logoutController)
.get("/status", protect, authStatusController)


export default authRoutes;