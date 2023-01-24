import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _matchService = new MatchService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this._matchService.getAll();

    res.status(StatusCodes.OK).json(matches);
  };
}
