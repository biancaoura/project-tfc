import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { generalLeaderboard, homeLeaderboard, awayLeaderboard } from './mocks/leaderboardMock';
import { teams } from './mocks/teamMock'
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Leaderboard route', function() {

  let response: Response;

  beforeEach(async () => {
    sinon
    .stub(Team, 'findAll')
    .resolves( teams as Team[]);
  })

  afterEach(sinon.restore);

  describe('Testing GET /leaderboard route', function () {
    it('1 - Should return the leaderboard with all of the teams and their information', async function () {
      response = await chai
      .request(app)
      .get('/leaderboard');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(generalLeaderboard);
    });
  });

  describe('Testing GET /leaderboard/home route', function () {
    it('1 - Should return the leaderboard when the teams are playing home, with all of the teams and their information', async function () {
      response = await chai
      .request(app)
      .get('/leaderboard/home');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(homeLeaderboard);
    });
  });

  describe('Testing GET /leaderboard/away route', function () {
    it('1 - Should return the leaderboard when the teams are playing when visiting, with all of the teams and their information', async function () {
      response = await chai
      .request(app)
      .get('/leaderboard/away');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(awayLeaderboard);
    });
  });
});