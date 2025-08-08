import deviceModel from "../db/models/device.model.js";

export default class DeviceService {
  constructor() {}

  getAll = async () => {
    return await deviceModel.find().populate("tag");
  };

  getByIp = async (ip) => {
    return await deviceModel.findOne({ ip });
  };

  getById = async (id) => {
    return await deviceModel.findById(id).populate("tag");
  };

  create = async (datos) => {
    return await deviceModel.create(datos);
  };

  update = async (id, datos) => {
    return await deviceModel.findByIdAndUpdate(id, datos, { new: true });
  };

  delete = async (id) => {
    return await deviceModel.findByIdAndDelete(id);
  };

  pause = async (id, datos) => {
    return await deviceModel.findByIdAndUpdate(id, datos, { new: true });
  };
}
