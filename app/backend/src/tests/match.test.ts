import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';
import { matches, invalidMatch, matchWithInvalidTeam, validMatch, createdMatch, matchToEdit, editedMatch } from './mocks/matchMock';
import { token } from './mocks/userMock';
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

  describe('Testing POST /matches route', function () {

    it('1 - Should create a new match if the teams exist', async function () {
      sinon
      .stub(Match, 'create')
      .resolves(createdMatch as Match);

      response = await chai
      .request(app)
      .post('/matches')
      .set({ 'Authorization': token })
      .send(validMatch);

      expect(response.status).to.be.equal(StatusCodes.CREATED);
    });

    it('2 - Should throw an error when trying to create a new match with only one team', async function() {
      response = await chai
      .request(app)
      .post('/matches')
      .set({ 'Authorization': token })
      .send(invalidMatch);
      
      expect(response.status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
    
    it('3 - Should throw an error when trying to create a new match with an invalid team', async function () {
      response = await chai
      .request(app)
      .post('/matches')
      .set({ 'Authorization': token })
      .send(matchWithInvalidTeam);
      
      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
    });
  });

  describe('Testing PATCH /matches route', function () {
    it('1 - Should update the correct match at /matches/1', async function () {
      sinon
      .stub(Match, 'findOne')
      .resolves(editedMatch as any);

      response = await chai
      .request(app)
      .patch('/matches/1')
      .set({ 'Authorization': token })
      .send(matchToEdit);

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal(editedMatch);
    });

    it('2 - Should be able to mark a match as finished at /matches/1/finish', async function () {
      sinon
      .stub(Match, 'findOne')
      .resolves(editedMatch as any);

      response = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set({ 'Authorization': token });

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.deep.equal({ message: 'Finished' });
    });
  });
});