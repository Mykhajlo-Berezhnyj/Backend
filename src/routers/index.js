import { Router } from "express";
import authRouter from "./auth.js";
import recipesRouter from "./recipes.js";
import userRouter from "./user.js";
import categoriesRouter from "./categories.js";
import ingredientsRouter from "./ingredients.js";

const router = Router();

router.use("/recipes", recipesRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/categories", categoriesRouter);
router.use("/ingredients", ingredientsRouter);

export default router;
