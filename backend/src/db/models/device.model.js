import mongoose from "mongoose";

const DeviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    isAlive: { type: Boolean, default: false },
    isConnected: { type: Boolean, default: true },
  },
  { timestamp: true }
);

const deviceModel= mongoose.model("devices", DeviceSchema);

export default deviceModel;