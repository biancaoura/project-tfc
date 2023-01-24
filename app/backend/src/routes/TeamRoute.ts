import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/', teamController.getAll);

router.get('/:id', teamController.getById);

export default router;
