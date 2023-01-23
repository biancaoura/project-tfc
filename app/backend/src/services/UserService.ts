import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/HttpError';
import JWT from '../utils/JWT';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';

const jwt = new JWT();

export default class UserService {
  constructor(private _userModel = User) { }

  public async login(user: ILogin) {
    const { email, password } = user;

    const validUser = await this._userModel.findOne({ where: { email } });

    if (!validUser) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = jwt.createToken(user);
    return { status: StatusCodes.OK, message: token };
  }

  public async getRole(email: string) {
    const user = await this._userModel.findOne({ where: { email } });
    if (user) {
      return { status: StatusCodes.OK, role: user.role };
    }

    throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token not found');
  }
}
