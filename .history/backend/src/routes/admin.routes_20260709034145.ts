import { Router } from "express";
import { authorize, protect } from "../middleware/auth.middleware";
import {
  createStaff,
  getAllStaffs,
  promoteToHr,
} from "../controllers/admin.controller";

const router = Router();

router.get("/employees", protect, authorize("ADMIN"), getAllStaffs);
router.post("/employees", protect, authorize("ADMIN"), createStaff);
router.patch(
  "/employees/:id/promote",
  protect,
  authorize("ADMIN"),
  promoteToHr,
);

export default router;
