import { Router } from "express";
import {
  getDeviceStatController,
} from "../controllers/deviceStats.controller.js";

const deviceStatsRouter = Router();

deviceStatsRouter.get("/:did", getDeviceStatController);

export default deviceStatsRouter;
