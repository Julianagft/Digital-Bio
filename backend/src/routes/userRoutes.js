import express from 'express';
import UserRepository from '../repositories/userRepository.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';

const userRoutes = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


userRoutes.get('/', userController.listAll);

userRoutes.post('/', userController.create);

userRoutes.get('/:id', userController.findById);

userRoutes.put('/:id', userController.updateUser);

userRoutes.delete('/:id', userController.deleteUser);

export default userRoutes;
