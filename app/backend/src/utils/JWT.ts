import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

export default class JWT {
  private _secret:string;
  private _jwtConfig: object;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
    this._jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  }

  public createToken(payload: ILogin): string | void {
    return jwt.sign({ payload }, this._secret, this._jwtConfig);
  }
}
