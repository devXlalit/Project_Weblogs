import mongoose from "mongoose";

var isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "weblogs",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
