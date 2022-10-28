import { Router } from "express";
import {
  getFirstPersonInQueue,
  addPersonToQueue,
  deletePersonFromQueue,
} from "../controllers/manualValidation.controller.js";
const router = Router();

router.get("/manualValidation", getFirstPersonInQueue);
router.delete("/manualValidation/:id", deletePersonFromQueue);
router.post("/manualValidation", addPersonToQueue);
 

export default router;
