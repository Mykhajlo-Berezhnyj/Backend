import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getAreaController } from "../controllers/area.js";

const router = Router();

router.get("/", ctrlWrapper(getAreaController));

export default router;
