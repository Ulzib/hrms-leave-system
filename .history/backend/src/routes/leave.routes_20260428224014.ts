import { Router } from "express";
import protect from "../middleware/auth.middleware";
import {
  createRequestType,
  getRequestTypes,
} from "../controllers/leave.controller";

const router = Router();

router.get("/types", protect, getRequestTypes);
router.post("/types", protect, authorize("ADMIN"), createRequestType);
