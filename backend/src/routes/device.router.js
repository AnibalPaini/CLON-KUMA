import { Router } from "express";
import {
  getDevicesController,
  postDevicesController,
  putDevicesController,
  delDevicesController,
} from "../controllers/device.controller.js";

const deviceRouter = Router();

deviceRouter.get("/", getDevicesController);
deviceRouter.post("/", postDevicesController);
deviceRouter.put("/:did", putDevicesController);
deviceRouter.delete("/:did", delDevicesController);

export default deviceRouter;
