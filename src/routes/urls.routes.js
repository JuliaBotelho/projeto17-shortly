import { Router } from "express";
import { checkNewUrl } from "../middlewares/urls.middlewares.js";
import { convertToShort , retrieveUrlId, directToShortUrl, excludeUrl } from "../controllers/urls.controllers.js";

const router = Router();

router.post("/urls/shorten", checkNewUrl ,convertToShort);
router.get("/urls/:id", retrieveUrlId);
router.get("/urls/open/:shortUrl", directToShortUrl);
router.delete("/urls/:id", excludeUrl);

export default router;