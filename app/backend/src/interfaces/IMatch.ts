import IGoals from './IGoals';

export default interface IMatch extends IGoals {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  inProgress?: boolean;
}
