import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ILogin from '../interfaces/ILogin';

export default class ValidateLogin {
  public loginFields = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: ILogin = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
