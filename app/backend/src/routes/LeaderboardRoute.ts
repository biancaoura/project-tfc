import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/', leaderboardController.getLeaderboard);

router.get('/home', leaderboardController.getHomeLeaderboard);

router.get('/away', leaderboardController.getAwayLeaderboard);

export default router;
