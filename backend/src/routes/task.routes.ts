import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repositories/task.repository";

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const controller = new TaskController(taskService);

router.use(requireAuth);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
