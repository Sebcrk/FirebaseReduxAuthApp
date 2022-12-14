import { Router } from "express";
import {
  getFirstProject,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";
const router = Router();

router.get("/projects", getFirstProject);
router.delete("/projects/:id", deleteProject);
router.post("/projects", createProject);
 



router.get("/projects/:id", getProject);
router.put("/projects/:id", updateProject);

export default router;
