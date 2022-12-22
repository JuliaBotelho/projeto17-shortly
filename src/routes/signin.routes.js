import { Router } from "express";

import { createNewLog } from '../controllers/signin.controllers.js';
import {checkNewLog} from '../middlewares/signin.middlewares.js';

const router = Router();

router.post("/signup", checkNewLog ,createNewLog);

export default router;