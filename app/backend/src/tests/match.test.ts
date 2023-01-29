import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';
import { matches } from './mocks/matchMock';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Matches route', function () {

  let response: Response;

  afterEach(sinon.restore);
  
  describe('Testing GET /matches route', function () {

    it('1 - Should return all matches without a query string', async function () {
      sinon
      .stub(Match, 'findAll')
      .resolves(matches as unknown as Match[]);

      response = await chai
      .request(app)
      .get('/matches');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(matches);
    });

    it('2 - Should return only the matches in progress with the filter', async function () {
      sinon
      .stub(Match, 'findAll')
      .resolves([matches[0]] as unknown as Match[]);

      response = await chai
      .request(app)
      .get('/matches?inProgress=true');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal([matches[0]]);
    });

    it('3 - Should return only the finished matches with the filter', async function () {
      sinon
      .stub(Match, 'findAll')
      .resolves([matches[1]] as unknown as Match[]);

      response = await chai
      .request(app)
      .get('/matches?inProgress=false');

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal([matches[1]]);
    });
  });
});