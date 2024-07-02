import cron from "node-cron";
import { pushToMongoDB } from "./populatedb.js";

cron.schedule("30 13 * * *", async () => {
  console.log("Scheduled daily update...", new Date().toISOString());

  try {
    await pushToMongoDB();
    console.log("Daily update completed successfully");
  } catch (err) {
    console.error("Error in daily update:", err);
  }
});
