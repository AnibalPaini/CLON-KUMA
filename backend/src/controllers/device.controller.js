import DeviceService from "../services/device.service.js";
const deviceService = new DeviceService();

export const getDevicesController = async (req, res) => {
  try {
    const devices = await deviceService.getAll();
    res.status(200).send({ status: "Success", payload: devices });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los devices!");
  }
};

export const postDevicesController = async (req, res) => {
  try {
    const { name, ip } = req.body;
    const exist = await deviceService.getByIp(ip);
    if (exist)
      return res.status(400).send({ error: "Dispositivo ya existente!" });
    const newDevice = await deviceService.create({ ip, name });
    res.status(201).send({ status: "Success", payload: newDevice });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear los devices!");
  }
};

export const putDevicesController = async (req, res) => {
  try {
    const { did } = req.params;
    const deviceUpdate = req.body;
    const deviceUpdated = await deviceService.update(did, deviceUpdate);
    if (!deviceUpdated)
      return res.status(404).send({ error: "Dispositivo no existente!" });
    res.status(200).send({ status: "Success", payload: deviceUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear los devices!");
  }
};

export const delDevicesController = async (req, res) => {
  try {
    const { did } = req.params;
    const deviceDelete = await deviceService.delete(did);
    if (!deviceDelete)
      return res.status(404).send({ error: "Dispositivo no existente!" });
    res.status(200).send({ status: "Success", payload: deviceDelete });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear los devices!");
  }
};
