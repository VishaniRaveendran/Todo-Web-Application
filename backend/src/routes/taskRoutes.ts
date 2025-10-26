import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.post("/tasks", (req, res) => taskController.createTask(req, res));
router.get("/tasks", (req, res) => taskController.getTasks(req, res));
router.get("/tasks/completed", (req, res) =>
  taskController.getCompletedTasks(req, res)
);
router.patch("/tasks/:id/complete", (req, res) =>
  taskController.completeTask(req, res)
);

export default router;
