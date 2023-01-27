import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) { }

  public getLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const leaderboard = await this._leaderboardService.getOverallLeaderboard();

    res.status(StatusCodes.OK).json(leaderboard);
  };

  public getHomeLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const leaderboard = await this._leaderboardService.getLeaderboard('home');

    res.status(StatusCodes.OK).json(leaderboard);
  };

  public getAwayLeaderboard = async (_req: Request, res: Response): Promise<void> => {
    const leaderboard = await this._leaderboardService.getLeaderboard('away');

    res.status(StatusCodes.OK).json(leaderboard);
  };
}
