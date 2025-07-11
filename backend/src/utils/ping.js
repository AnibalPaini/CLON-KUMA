import ping from "ping";
import deviceHistoryModel from "../db/models/deviceHistory.model.js";
import DeviceService from "../services/device.service.js";
const deviceService = new DeviceService();

const timePing = 5 * 1000; //5seg

const pings = () => {
  setInterval(async () => {
    let hosts = await deviceService.getAll();
    for (let host of hosts) {
      ping.promise.probe(host.ip, { timeout: 10 }).then(async (res) => {
        let newIsAlive = res.alive;
        console.log(`Dispositivo: ${host.name} - ${host.ip} - ${host.isAlive}`);
        if (newIsAlive != host.isAlive) {
          console.log(
            `Dispositivo: ${host.name} - ${host.ip} - ${host.isAlive}`
          );
          await deviceHistoryModel.create({
            deviceId: host._id,
            ip: host.ip,
            name: host.name,
            status: newIsAlive? "UP": "DOWN",
          });
          let updateIsAlive = { isAlive: newIsAlive };
          await deviceService.update(host.id, updateIsAlive);
        }
      });
    }
  }, timePing);
};

export default pings;
