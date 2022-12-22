import { Router } from "express";

import { createNewUser } from '../controllers/signup.controllers.js';
import { checkNewUser } from '../middlewares/signup.middlewares.js';

const router = Router();

router.post("/signup", checkNewUser, createNewUser);

export default router;