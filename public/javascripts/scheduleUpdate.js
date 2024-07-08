import mongoose from "mongoose";
import { uri } from "../../config.js";
import cron from "node-cron";
import { pushToMongoDB } from "./populatedb.js";

let isConnected = false;

export function scheduleUpdate() {
  cron.schedule("* * * * *", async () => {
    console.log("Scheduled update...", new Date().toISOString());
    try {
      if (!isConnected) {
        await mongoose.connect(uri);
        isConnected = true;
        console.log("Connected to MongoDB");
      }
      await pushToMongoDB();
      console.log("Update completed successfully");
    } catch (err) {
      console.error("Error in update:", err);
      if (err.name === "MongoNetworkError") {
        isConnected = false;
      }
    }
  });
}
