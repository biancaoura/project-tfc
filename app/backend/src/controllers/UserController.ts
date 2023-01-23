import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { status, message } = await this._userService.login(req.body);

    return res.status(status).json({ token: message });
  };
}
