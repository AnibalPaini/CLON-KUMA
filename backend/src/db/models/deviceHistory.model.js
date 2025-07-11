import mongoose from "mongoose";

const DeviceHistorySchema= mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "devices" },
    ip: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ["UP", "DOWN"] },
},{timestamp:true})

const deviceHistoryModel= mongoose.model("deviceHistorys", DeviceHistorySchema)

export default deviceHistoryModel;