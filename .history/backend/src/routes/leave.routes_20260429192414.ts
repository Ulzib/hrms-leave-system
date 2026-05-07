import { Router } from "express";
import { authorize, protect } from "../middleware/auth.middleware";
import {
  createLeaveReq,
  createRequestType,
  getRequestTypes,
} from "../controllers/leave.controller";

const router = Router();

router.get("/types", protect, getRequestTypes);
router.post("/types", protect, authorize("ADMIN"), createRequestType);

router.post("/", protect, createLeaveReq);
