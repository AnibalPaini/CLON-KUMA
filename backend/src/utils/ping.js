import ping from "ping";
import deviceHistoryModel from "../db/models/deviceHistory.model.js";
import deviceStatsModel from "../db/models/deviceStats.model.js";
import DeviceService from "../services/device.service.js";
const deviceService = new DeviceService();

const timePing = 5 * 1000; //5seg

const pings = () => {
  setInterval(async () => {
    const hosts = await deviceService.getAll();
    for (let host of hosts) {
      checkDevice(host);
    }
  }, timePing);
};

const checkDevice = async (host) => {
  let devicesStats = await deviceStatsModel.findOne({ deviceId: host._id });
  if (!devicesStats) {
    devicesStats = await deviceStatsModel.create({
      deviceId: host._id,
      recentPings: [],
    });
  }

  const res = await ping.promise.probe(host.ip, { timeout: 10 });
  const newIsAlive = res.alive;

  if (newIsAlive !== host.isAlive) {
    await deviceHistoryModel.create({
      deviceId: host._id,
      ip: host.ip,
      name: host.name,
      status: newIsAlive ? "UP" : "DOWN",
    });

    await deviceService.update(host.id, { isAlive: newIsAlive });
  }

  if (devicesStats.recentPings.length >= 100) {
    devicesStats.recentPings.shift();
  }

  devicesStats.recentPings.push({
    status: newIsAlive ? "UP" : "DOWN",
    timestamp: new Date(),
  });

  await devicesStats.save();
};

export default pings;
