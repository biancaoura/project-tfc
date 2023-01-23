import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { status, message } = await this._userService.login(req.body);

    return res.status(status).json({ token: message });
  };

  public getRole = async (req: Request, res: Response) => {
    const { email } = req.body.user.payload;

    const { status, role } = await this._userService.getRole(email);

    return res.status(status).json({ role });
  };
}
