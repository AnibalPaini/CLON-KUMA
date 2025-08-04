import { Router } from "express";
import {
    postTagsController,
    getTagsController,
    getTagsByIdController
} from "../controllers/tags.controller.js";

const tagsRouter = Router();

tagsRouter.get("/", getTagsController);
tagsRouter.get("/:tid", getTagsByIdController);
tagsRouter.post("/",postTagsController)

export default tagsRouter;
