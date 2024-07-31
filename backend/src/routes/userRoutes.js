import { Router } from "express";

import UserController from "../controllers/userController.js";
import UserService from "../services/userService.js";
import UserRepository from "../repositories/userRepository.js";

import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get("/", userController.listAll);

userRoutes.post("/", userController.create);

userRoutes.get("/:id", authMiddleware, userController.findById);

userRoutes.put("/:id", authMiddleware, userController.updateUser);

userRoutes.delete("/:id", authMiddleware, userController.deleteUser);

export default userRoutes;
