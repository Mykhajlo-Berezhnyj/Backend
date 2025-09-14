import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { addOrderController, confirmOrderController } from "../controllers/order.js";

const router = Router();

router.post("/", ctrlWrapper(addOrderController));
router.patch("/", ctrlWrapper(confirmOrderController));

export default router;
