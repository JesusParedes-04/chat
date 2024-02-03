import dotenv from "dotenv";
dotenv.config();

export const REMOTE_MONGO_URL = process.env.REMOTE_MONGO_URL;
export const PORT = process.env.PORT || 8080

