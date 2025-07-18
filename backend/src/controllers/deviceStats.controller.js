import DeviceStatsService from "../services/deviceStats.service.js";
const deviceStatsService = new DeviceStatsService();

export const getDeviceStatController = async (req, res) => {
  try {
    const { did } = req.params;
    const stats = await deviceStatsService.getByDeviceId(did);

    let total = stats.recentPings.length;
    let pingUp = stats.recentPings.filter((p) => p.status === "UP").length;
    let pingDown = total - pingUp;
    let promedio = total > 0 ? ((pingUp / total) * 100).toFixed(2) : 0;

    res.status(200).send({
      payload: { total, pingUp, pingDown, promedio },
    });
  } catch (error) {
    res.status(500).send("Error");
  }
};
