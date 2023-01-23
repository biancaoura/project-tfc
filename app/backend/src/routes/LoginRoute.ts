import { Router } from 'express';
import UserController from '../controllers/UserController';
import ValidateLogin from '../middlewares/ValidateLogin';

const userController = new UserController();
const validateLogin = new ValidateLogin();

const router = Router();

router.post('/', validateLogin.loginFields, userController.login);

export default router;
