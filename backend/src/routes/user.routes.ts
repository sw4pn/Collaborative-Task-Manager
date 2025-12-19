import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Dependency wiring
 */
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * User routes
 */
router.get("/assignee", requireAuth, userController.getAllAssignees);
router.get("/profile", requireAuth, userController.getSelfProfile);
router.put("/profile", requireAuth, userController.updateUserProfile);

export default router;
