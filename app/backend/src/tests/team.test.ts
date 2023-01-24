import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { teams } from './mocks/teamMock';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Teams route', function () {

  let response: Response;

  afterEach(sinon.restore);

  describe('Testing GET /teams route', function () {

    beforeEach(async () => {
      sinon
        .stub(Team, 'findAll')
        .resolves(teams as Team[]);
    });

    it('1 - Should return all teams', async function() {
      response = await chai
      .request(app)
      .get('/teams');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(teams);
    });
  });

  describe('Testing GET /teams/:id route', function () {

    it('1 - Should return the correct team when searching by id', async function () {
      sinon
      .stub(Team, 'findByPk')
      .resolves(teams[0] as Team);

      response = await chai
      .request(app)
      .get('/teams/1');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(teams[0]);
    });

    it('2 - Should throw an error if there\'s no corresponding team', async function () {
      sinon
      .stub(Team, 'findByPk')
      .resolves(teams[2] as Team);

      response = await chai
      .request(app)
      .get('/teams/3');

      expect(response.status).to.be.equal(StatusCodes.IM_A_TEAPOT);
    });
  });
});
