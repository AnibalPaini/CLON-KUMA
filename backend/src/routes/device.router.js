import { Router } from "express";
import {
  getDevicesController,
  postDevicesController,
  putDevicesController,
  delDevicesController,
  pauseDeviceController,
  getDevicesByIdController
} from "../controllers/device.controller.js";

const deviceRouter = Router();
//CRUD
deviceRouter.get("/", getDevicesController);
deviceRouter.post("/", postDevicesController);
deviceRouter.put("/:did", putDevicesController);
deviceRouter.delete("/:did", delDevicesController);
//------------
deviceRouter.get("/:did", getDevicesByIdController);
deviceRouter.put("/pause/:did", pauseDeviceController);

export default deviceRouter;
