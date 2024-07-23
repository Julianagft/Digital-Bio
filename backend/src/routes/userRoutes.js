import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import UserRepository from '../repositories/userRepository.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';

const userRoutes = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


userRoutes.get('/',authMiddleware, userController.listAll);

userRoutes.post('/', userController.create);

userRoutes.get('/:id',authMiddleware, userController.findById);

userRoutes.put('/:id',authMiddleware, userController.updateUser);

userRoutes.delete('/:id', authMiddleware, userController.deleteUser);

export default userRoutes;
