import express from "express";
import { getScreenToken } from "../controllers/chat.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/token",protectRoute,getScreenToken)

export default router;
