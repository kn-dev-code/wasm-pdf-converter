import express, { Request, Response} from "express";
import "dotenv/config"
import cors from "cors";
import http from "http"
import { Env } from "./config/env-config";
import { asyncHandler } from "./middlewares/async-handler";
import { HTTPSTATUS } from "./config/http-config";
import { errorHandler } from "./middlewares/error-handler";
import connectDatabase from "./config/database-config";
import { logger } from "./config/winston-config";



const app = express();
const server = http.createServer(app)

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: typeof Env.FRONTEND_ORIGIN,
  credentials: true,
}));

app.get("/health", asyncHandler(async (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json({
  message: "Server is healthy",
  status: "OK",
  })
  
}))


app.use(errorHandler);

server.listen(Env.PORT, async() => {
  await connectDatabase();
  logger.info(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})
