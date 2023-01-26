import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) { }

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this._leaderboardService.getLeaderboard();

    res.status(StatusCodes.OK).json(leaderboard);
  };
}
