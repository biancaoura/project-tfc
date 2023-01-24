import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private _teamService = new TeamService()) { }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this._teamService.getAll();

    res.status(StatusCodes.OK).json(teams);
  };
}
