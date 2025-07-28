import DeviceStatsService from "../services/deviceStats.service.js";
const deviceStatsService = new DeviceStatsService();

export const getDeviceStatController = async (req, res) => {
  try {
    const { did } = req.params;
    const stats = await deviceStatsService.getByDeviceId(did);

    let total = stats.recentPings.length;
    let pingUp = stats.recentPings.filter((p) => p.status === "UP").length;
    let pingDown = total - pingUp;
    let promedio = total > 0 ? (pingUp / total) * 100 : 0;
    promedio = promedio.toFixed(promedio === 100 ? 0 : 2);
    let paused = stats.deviceId.paused;

    let lastPing = stats.recentPings[total - 1];
    let ms = lastPing.ms;

    res.status(200).send({
      payload: { total, pingUp, pingDown, promedio, paused, ms },
    });
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
};

export const getDevicesPromedios = async (req, res) => {
  try {
    const { did } = req.params;
    const stats = await deviceStatsService.getByDeviceId(did);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hora atrás

    const lastHourPings = stats.recentPings.filter(
      (p) => p.timestamp > oneHourAgo && p.ms !== null
    );

    const avgLastHour =
      lastHourPings.length > 0
        ? (
            lastHourPings.reduce((sum, p) => sum + parseFloat(p.ms), 0) /
            lastHourPings.length
          ).toFixed(2)
        : 0;
    //---------------
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const lastDayPings = stats.recentPings.filter(
      (p) => p.timestamp > dayAgo && p.ms !== null
    );

    const avgLastDay =
      lastDayPings.length > 0
        ? (
            lastDayPings.reduce((sum, p) => sum + parseFloat(p.ms), 0) /
            lastDayPings.length
          ).toFixed(2)
        : 0;
    //----------------

    const avgLastDowns= (stats.recentPings.filter(
      (p) => (p.status === "DOWN")).length
    );
    

    res.status(200).send({ payload: { avgLastDay, avgLastHour, avgLastDowns } });
  } catch (error) {
    res.status(500).send("Error en el servidor.");
    console.log(error);
  }
};
