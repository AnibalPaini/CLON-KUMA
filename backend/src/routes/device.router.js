import { Router } from "express";
import {
  getDevicesController,
  postDevicesController,
  putDevicesController,
  delDevicesController,
  pauseDeviceController
} from "../controllers/device.controller.js";

const deviceRouter = Router();
//CRUD
deviceRouter.get("/", getDevicesController);
deviceRouter.post("/", postDevicesController);
deviceRouter.put("/:did", putDevicesController);
deviceRouter.delete("/:did", delDevicesController);
//------------
deviceRouter.put("/pause/:did", pauseDeviceController);

export default deviceRouter;
