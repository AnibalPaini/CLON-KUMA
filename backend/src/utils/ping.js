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
  console.log(`Ping ${host.ip}, ${res.alive}`);
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

  if (devicesStats.recentPings.length >= 50) {
    devicesStats.recentPings.shift();
  }

  devicesStats.recentPings.push({
    status: newIsAlive ? "UP" : "DOWN",
    timestamp: new Date(),
  });

  await devicesStats.save();

  // Calcular porcentaje de pings UP
  let total = devicesStats.recentPings.length;
  let pingUp = devicesStats.recentPings.filter((p) => p.status === "UP").length;
  let pingDown = total - pingUp;
  let promedio = total > 0 ? ((pingUp / total) * 100).toFixed(2) : 0;

  io.emit("stats:update", {
    deviceId: host._id,
    promedio: promedio,
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
    (host) => host.isConnected === true
  ).length;
  console.log(devicesConnected);
  

  let devicesDisconnected = hosts.length - devicesConnected;

  io.emit("pings:connected", {
    connected: devicesConnected,
    disconnected: devicesDisconnected,
  });
};

export default pings;
