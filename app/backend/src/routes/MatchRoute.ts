import { Router } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', matchController.getAll);

router.post('/', ValidateToken.auth, matchController.create);

router.patch('/:id', matchController.edit);

router.patch('/:id/finish', matchController.finish);

export default router;
