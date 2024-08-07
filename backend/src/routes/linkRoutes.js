import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import LinkRepository from '../repositories/linkRepository.js';
import LinkService from '../services/linkService.js';
import LinkController from '../controllers/linkController.js';

const linkRoutes = express.Router();

const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);
const linkController = new LinkController(linkService);

linkRoutes.post('/:userId', linkController.create);

linkRoutes.get('/', linkController.listAll);

linkRoutes.get('/users/:userId', linkController.listAllByUser);

linkRoutes.get('/:id', linkController.findById);

linkRoutes.put('/:id',authMiddleware, linkController.updateLink);

linkRoutes.delete('/:id',authMiddleware, linkController.deleteLink);

export default linkRoutes;
