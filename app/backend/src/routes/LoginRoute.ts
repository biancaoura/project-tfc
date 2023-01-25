import { Router } from 'express';
import ValidateToken from '../middlewares/ValidateToken';
import UserController from '../controllers/UserController';
import ValidateLogin from '../middlewares/ValidateLogin';

const userController = new UserController();
const validateLogin = new ValidateLogin();

const router = Router();

router.get('/validate', ValidateToken.auth, userController.getRole);

router.post('/', validateLogin.loginFields, userController.login);

export default router;
