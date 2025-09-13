import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { addOrderController } from "../controllers/order.js";

const router = Router();

router.post("/", ctrlWrapper(addOrderController));

export default router;
