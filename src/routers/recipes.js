import { Router } from 'express';
import { getRecipeByIdController } from '../controllers/recipes.js';
import favoriteRouter from './favorites.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { validateBody } from "../middlewares/validateBody.js";
// import { authenticate } from '../middlewares/authenticate.js';
// import { upload } from "../middlewares/multer.js";

const router = Router();

router.get('/:id', isValidId('id'), ctrlWrapper(getRecipeByIdController));

router.use('/favorite', favoriteRouter);

export default router;
