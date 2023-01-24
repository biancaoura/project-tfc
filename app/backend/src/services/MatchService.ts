import IMatch from '../interfaces/IMatch';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(
    private _matchModel = Match,
  ) { }

  public async getAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });

    return matches;
  }
}
