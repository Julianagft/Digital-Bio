import { Router } from "express";

import AuthController from "../controllers/authController.js";
import AuthService from "../services/authService.js";
import UserRepository from "../repositories/userRepository.js";

const authRoutes = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", authController.authenticateUser);

export default authRoutes;
