import IPoints from '../interfaces/IPoints';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import ILeaderboard from '../interfaces/ILeaderboard';
import TeamService from './TeamService';

export default class LeaderboardService {
  constructor(
    private _teamService = new TeamService(),
    private _matchModel = Match,
  ) { }

  public async getLeaderboard() {
    const teams = await this._teamService.getAll();

    const homeTeam = Promise.all(teams.map(async (t) => this.getTeamStats(t)));

    const rank = Promise.all(LeaderboardService.getRank(await homeTeam));

    return rank;
  }

  private async getTeamStats(team: ITeam): Promise<ILeaderboard> {
    const teamMatches = await this._matchModel.findAll({
      where: { homeTeamId: team.id, inProgress: false },
    });

    const points = teamMatches.map(LeaderboardService.calculatePoints);

    const totalPoints = LeaderboardService.getTotalPoints(points);
    const totalGames = teamMatches.length;
    const matchResult = LeaderboardService.getMatchResults(points);
    const efficiency = LeaderboardService.calculateEfficiency(totalPoints, totalGames);
    const goals = LeaderboardService.getGoals(teamMatches);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      ...matchResult,
      ...goals,
      efficiency,
    };
  }

  private static calculatePoints(match: IMatch) {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) return { homeTeam: 3, awayTeam: 0, win: 'home' };
    if (homeTeamGoals < awayTeamGoals) return { homeTeam: 0, awayTeam: 3, win: 'away' };
    return { homeTeam: 1, awayTeam: 1, win: 'draw' };
  }

  private static getTotalPoints(points: IPoints[]) {
    return points.reduce((curr, acc) => curr + acc.homeTeam, 0);
  }

  private static getMatchResults(points: IPoints[]) {
    return {
      totalVictories: points.filter(({ win }) => win === 'home').length,
      totalDraws: points.filter(({ win }) => win === 'draw').length,
      totalLosses: points.filter(({ win }) => win === 'away').length,
    };
  }

  private static getGoals(matches: IMatch[]) {
    const goalsFavor = matches
      .map(({ homeTeamGoals }) => homeTeamGoals)
      .reduce((a, b) => a + b);

    const goalsOwn = matches
      .map(({ awayTeamGoals }) => awayTeamGoals)
      .reduce((a, b) => a + b);

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  private static calculateEfficiency(totalPoints: number, totalGames: number) {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  private static getRank(teams: ILeaderboard[]) {
    return teams.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }
}
