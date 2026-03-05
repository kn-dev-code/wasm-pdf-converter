import mongoose from "mongoose"
import { Env } from "./env-config" 
import { logger } from "./winston-config";



const connectDatabase = async() => {
  try {
(await mongoose.connect(Env.MONGO_URI));
logger?.info("Database connected");
  } catch(e) {
    logger.error("Database failed: ", e)
process.exit(1);
  }
}


export default connectDatabase;