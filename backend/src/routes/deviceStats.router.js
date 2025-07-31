import { Router } from "express";
import {
  getDeviceStatController,
  getDevicesPromedios,
  getLastsPings
} from "../controllers/deviceStats.controller.js";

const deviceStatsRouter = Router();

deviceStatsRouter.get("/:did", getDeviceStatController);
deviceStatsRouter.get("/:did/promedios", getDevicesPromedios);
deviceStatsRouter.get("/pings/:did",getLastsPings)

export default deviceStatsRouter;
