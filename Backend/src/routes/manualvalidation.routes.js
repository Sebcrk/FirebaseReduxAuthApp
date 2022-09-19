import { Router } from "express";
import {
  getFirstPersonInQueue,
  getProject,
  getProjectTasks,
  addPersonToQueue,
  updateProject,
  deletePersonFromQueue,
} from "../controllers/manualValidation.controller.js";
const router = Router();

router.get("/manualValidation", getFirstPersonInQueue);
router.delete("/manualValidation/:id", deletePersonFromQueue);
router.post("/manualValidation", addPersonToQueue);
 



router.get("/manualValidation/:id", getProject);
router.get("/manualValidation/:id/tasks", getProjectTasks);
router.put("/manualValidation/:id", updateProject);

export default router;
