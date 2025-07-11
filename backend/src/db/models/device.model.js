import mongoose from "mongoose";

const DeviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    isAlive: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
  },
  { timestamp: true }
);

const deviceModel= mongoose.model("devices", DeviceSchema);

export default deviceModel;