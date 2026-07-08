import { Router } from "express";
import { authorize, protect } from "../middleware/auth.middleware";
import { getAllStaffs } from "../controllers/admin.controller";

const router = Router();

router.get("/employees", protect, authorize("ADMIN"), getAllStaffs);
router.post("/employees", protect, authorize("ADMIN"), c);
