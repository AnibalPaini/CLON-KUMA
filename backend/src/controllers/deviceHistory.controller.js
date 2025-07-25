import DeviceHistoryService from "../services/deviceHistory.service.js";

const deviceHistoryService = new DeviceHistoryService();
export const getDeviceHistoryController = async (req, res) => {
  try {
    const { did } = req.params;
    console.log(did);
    const deviceHistory = await deviceHistoryService.findById(did);
    if (!deviceHistory)
      return res.status(404).send({ error: "No encontrado!" });
    res.status(200).send({ status: "Success", payload: deviceHistory });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
