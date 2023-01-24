import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  constructor(private _teamModel = Team) { }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }
}
