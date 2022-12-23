import { Router } from "express";

import { createNewLog } from '../controllers/signin.controllers.js';
import {checkNewLog} from '../middlewares/signin.middlewares.js';

const router = Router();

router.post("/signin", checkNewLog ,createNewLog);

export default router;