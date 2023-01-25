import IMatch from '../interfaces/IMatch';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(
    private _matchModel = Match,
  ) { }

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
}
