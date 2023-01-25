import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/HttpError';
import JWT from '../utils/JWT';

const jwt = new JWT();

export default class ValidateToken {
  public static auth = async (req: Request, _res: Response, next: NextFunction) => {
    const { authorization: token } = req.headers;

    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token not found');

    try {
      const payload = jwt.validateToken(token);
      req.body.user = payload;
      next();
    } catch (e) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  };
}
