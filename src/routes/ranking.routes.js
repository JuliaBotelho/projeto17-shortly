import { Router } from "express";
import { retrieveRanks } from '../controllers/ranking.controllers.js';

const router = Router();

router.get("/ranking", retrieveRanks);

export default router;

