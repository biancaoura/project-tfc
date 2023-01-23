import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/HttpError';
import ILogin from '../interfaces/ILogin';

export default class ValidateLogin {
  public loginFields = async (req: Request, _res: Response, next: NextFunction) => {
    const { email, password }: ILogin = req.body;

    if (!email || !password) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }
    next();
  };
}
