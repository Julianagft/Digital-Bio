import express from 'express';
import AuthRepository from '../repositories/authRepository.js';
import AuthService from '../services/authService.js';
import AuthController from '../controllers/authController.js';

const authRoutes = express.Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRoutes.post('/login', authController.authenticateUser);

export default authRoutes;
