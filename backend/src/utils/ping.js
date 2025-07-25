import ping from "ping";
import deviceHistoryModel from "../db/models/deviceHistory.model.js";
import deviceStatsModel from "../db/models/deviceStats.model.js";
import DeviceService from "../services/device.service.js";
import { io } from "../app.js";
const deviceService = new DeviceService();

const timePing = 5 * 1000; //5seg

const pings = () => {
  setInterval(async () => {
    const hosts = await deviceService.getAll();
    eventStatusDevices(hosts);
    for (let host of hosts.filter((h) => h.paused === false)) {
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
  const res = await ping.promise.probe(host.ip, { timeout: 5 });
  const newIsAlive = res.alive;
  //console.log(`${host.ip}`);

  if (newIsAlive !== host.isAlive) {
    await deviceHistoryModel.create({
      deviceId: host._id,
      history: [
        {
          status: newIsAlive ? "UP" : "DOWN",
          message: res.output,
        }
      ],
    });

    await deviceService.update(host.id, { isAlive: newIsAlive });
  }

  if (devicesStats.recentPings.length >= 50) {
    devicesStats.recentPings.shift();
  }

  devicesStats.recentPings.push({
    status: newIsAlive ? "UP" : "DOWN",
    timestamp: new Date(),
    ms: res.avg === "unknown" ? "Not Response" : res.avg,
  });

  await devicesStats.save();

  // Calcular porcentaje de pings UP
  let total = devicesStats.recentPings.length;
  let pingUp = devicesStats.recentPings.filter((p) => p.status === "UP").length;
  let pingDown = total - pingUp;
  let promedio = total > 0 ? (pingUp / total) * 100 : 0;
  promedio = promedio.toFixed(promedio === 100 ? 0 : 2);

  io.emit("stats:update", {
    deviceId: host._id,
    promedio: promedio,
    ms: res.avg === "unknown" ? "Not Response" : res.avg,
  });

  io.emit("device:update", {
    deviceId: host._id,
    isAlive: newIsAlive,
  });

  let lastsPings = devicesStats.recentPings.slice(-20);

  io.emit("pings:update", {
    deviceId: host._id,
    lastsPings: lastsPings,
  });
};

const eventStatusDevices = (hosts) => {
  let devicesConnected = hosts.filter(
    (host) => host.isConnected && host.paused === false
  ).length;

  let devicesDisconnected = hosts.filter(
    (host) => host.isConnected === false
  ).length;

  io.emit("pings:connected", {
    connected: devicesConnected,
    disconnected: devicesDisconnected,
  });
};

export default pings;
