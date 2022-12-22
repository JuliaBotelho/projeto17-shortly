import { Router } from "express";
import { retrieveData } from '../controllers/users.controllers.js';

const router = Router();

router.get("/users/me", retrieveData)

export default router;