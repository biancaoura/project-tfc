import { Router } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const validateToken = new ValidateToken();

const router = Router();

router.get('/', matchController.getAll);

router.post('/', validateToken.auth, matchController.create);

export default router;
