import { Router } from "express";
import { authorize, protect } from "../middleware/auth.middleware";
import {
  createLeaveReq,
  createRequestType,
  getMyLeaveReqs,
  getRequestTypes,
} from "../controllers/leave.controller";

const router = Router();

router.get("/types", protect, getRequestTypes);
router.post("/types", protect, authorize("ADMIN"), createRequestType);

router.post("/", protect, createLeaveReq);
router.get("/my-request", protect, getMyLeaveReqs);
router.get("/all");
