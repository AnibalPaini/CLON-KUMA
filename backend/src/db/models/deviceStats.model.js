import mongoose from "mongoose";

const deviceStatsSchema = mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "devices", required: true },
  recentPings: [
    {
      status: { type: String, enum: ["UP", "DOWN"] },
      timestamp: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

const deviceStatsModel= mongoose.model("deviceStatistics", deviceStatsSchema)

export default deviceStatsModel;