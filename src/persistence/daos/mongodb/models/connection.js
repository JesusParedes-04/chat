import mongoose from "mongoose";
import config from "../../../../config.js"


export const connectionString = config.REMOTE_MONGO_URL


export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString, {

    });
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log('error');
  }
};