import { Router } from "express";
import {
  getProjects,
  getProject,
  getProjectTasks,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";
const router = Router();

router.get("/projects", getProjects);
router.get("/projects/:id", getProject);
router.get("/projects/:id/tasks", getProjectTasks);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;
