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

  public async getLeaderboard(gamePlace: 'home' | 'away') {
    const teams = await this._teamService.getAll();

    const team = Promise.all(teams.map(async (t) => this.getTeamStats(t, gamePlace)));

    const rank = Promise.all(LeaderboardService.getRank(await team));

    return rank;
  }

  private async getTeamStats(team: ITeam, gamePlace: 'home' | 'away'): Promise<ILeaderboard> {
    const teamMatches = await this._matchModel.findAll({
      where: { [`${gamePlace}TeamId`]: team.id, inProgress: false },
    });

    const points = teamMatches.map(LeaderboardService.calculatePoints);

    const totalPoints = LeaderboardService.getTotalPoints(points, gamePlace);
    const totalGames = teamMatches.length;
    const matchResult = LeaderboardService.getMatchResults(points, gamePlace);
    const efficiency = LeaderboardService.calculateEfficiency(totalPoints, totalGames);
    const goals = LeaderboardService.getGoals(teamMatches, gamePlace);

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

  private static getTotalPoints(points: IPoints[], gamePlace: 'home' | 'away') {
    return points.reduce((curr, acc) => curr + acc[`${gamePlace}Team`], 0);
  }

  private static getMatchResults(points: IPoints[], gamePlace: 'home' | 'away') {
    const isAway = gamePlace === 'home' ? 'away' : 'home';

    return {
      totalVictories: points.filter(({ win }) => win === gamePlace).length,
      totalDraws: points.filter(({ win }) => win === 'draw').length,
      totalLosses: points.filter(({ win }) => win === isAway).length,
    };
  }

  private static getGoals(matches: IMatch[], gamePlace: 'home' | 'away') {
    const isAway = gamePlace === 'home' ? 'away' : 'home';

    const goalsFavor = matches
      .map((match) => match[`${gamePlace}TeamGoals`])
      .reduce((a, b) => a + b);

    const goalsOwn = matches
      .map((match) => match[`${isAway}TeamGoals`])
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
