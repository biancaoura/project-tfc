import { StatusCodes } from 'http-status-codes';
import IGoals from '../interfaces/IGoals';
import IMatch from '../interfaces/IMatch';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import HttpError from '../utils/HttpError';

export default class MatchService {
  constructor(
    private _matchModel = Match,
  ) { }

  private static checkDuplicateTeam(homeTeamId: number, awayTeamId: number) {
    if (homeTeamId === awayTeamId) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'It is not possible to create a match with two equal teams',
      );
    }
  }

  public async getAll(inProgress: string | undefined): Promise<IMatch[]> {
    let where;
    if (inProgress) {
      where = inProgress === 'true' ? { inProgress: true } : { inProgress: false };
    }

    const matches = await this._matchModel.findAll({
      where,
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });

    return matches;
  }

  public async getById(id: number): Promise<IMatch> {
    const match = await this._matchModel.findByPk(id, {
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });

    if (!match) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    return match;
  }

  public async create(match: IMatch) {
    const { homeTeamId, awayTeamId } = match;

    MatchService.checkDuplicateTeam(homeTeamId, awayTeamId);

    await this.getById(homeTeamId);
    await this.getById(awayTeamId);

    const newMatch = await this._matchModel.create({ ...match, inProgress: true });

    return newMatch;
  }

  public async edit(id: string, goals: IGoals): Promise<IMatch> {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    const updatedMatch = await this.getById(Number(id));
    return updatedMatch;
  }

  public async finish(id: string) {
    const finished = { inProgress: 'false' };
    const edited = await this._matchModel.update(finished, { where: { id } });

    return edited;
  }
}
