import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { userController } from '../controllers/users.js';

const router = Router();

router.get('/current', authenticate, userController);

export default router;
