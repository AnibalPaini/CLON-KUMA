import { Router } from "express";
import {
  getDeviceHistoryController,
} from "../controllers/deviceHistory.controller.js";

const deviceHistoryRouter = Router();

deviceHistoryRouter.get("/:did", getDeviceHistoryController);


export default deviceHistoryRouter;
