import DeviceStatsService from "../services/deviceStats.service.js";
const deviceStatsService = new DeviceStatsService();

export const getDeviceStatController = async (req, res) => {
  try {
    const { did } = req.params;
    const stats = await deviceStatsService.getByDeviceId(did);
    
    let total = stats.recentPings.length;
    let pingUp = stats.recentPings.filter((p) => p.status === "UP").length;
    let pingDown = total - pingUp;
    let promedio = total > 0 ? ((pingUp / total) * 100) : 0;
    promedio= promedio.toFixed(promedio===100? 0:2)
    let paused= stats.deviceId.paused


    let lastPing= stats.recentPings[total-1]
    let ms=lastPing.ms
    
     
    res.status(200).send({
      payload: { total, pingUp, pingDown, promedio, paused, ms },
    });
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
    
  }
};
