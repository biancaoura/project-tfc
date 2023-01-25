import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _matchService = new MatchService()) { }

  public getAll = async (req: Request, res: Response):Promise<void> => {
    const { inProgress } = req.query;

    const matches = await this._matchService.getAll(inProgress as string | undefined);

    res.status(StatusCodes.OK).json(matches);
  };
}
