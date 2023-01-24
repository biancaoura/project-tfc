import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request, res: Response): Promise<void> => {
    const { status, message } = await this._userService.login(req.body);

    res.status(status).json({ token: message });
  };

  public getRole = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body.user.payload;

    const { status, role } = await this._userService.getRole(email);

    res.status(status).json({ role });
  };
}
