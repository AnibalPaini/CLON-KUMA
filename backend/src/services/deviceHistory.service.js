import deviceHistoryModel from "../db/models/deviceHistory.model.js";
export default class DeviceHistoryService {
  constructor() {}

  findById = async (id) => {
    return await deviceHistoryModel.find({deviceId:id});
  };
}
