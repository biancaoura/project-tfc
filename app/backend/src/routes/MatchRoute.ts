import { Router } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', matchController.getAll);

router.post('/', ValidateToken.auth, matchController.create);

export default router;
