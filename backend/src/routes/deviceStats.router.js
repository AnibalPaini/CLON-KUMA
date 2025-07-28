import { Router } from "express";
import {
  getDeviceStatController,
  getDevicesPromedios
} from "../controllers/deviceStats.controller.js";

const deviceStatsRouter = Router();

deviceStatsRouter.get("/:did", getDeviceStatController);
deviceStatsRouter.get("/:did/promedios", getDevicesPromedios);

export default deviceStatsRouter;
