import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private _teamService = new TeamService()) { }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this._teamService.getAll();

    res.status(StatusCodes.OK).json(teams);
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status, message } = await this._teamService.getById(id);

    res.status(status).json(message);
  };
}
