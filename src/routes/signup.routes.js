import express from "express";

import { checkNewUser } from '../middlewares/signup.middlewares.js';
import { createNewUser } from '../controllers/signup.controllers.js';

const router = express.Router();

router.post("/signup", checkNewUser, createNewUser);

export default router;