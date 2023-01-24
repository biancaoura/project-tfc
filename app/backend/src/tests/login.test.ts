import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { invalidToken, token, validLogin, validUser } from './mocks/userMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginRoute = '/login';
const roleRoute = '/login/validate';

describe('Testing Login route', function () {

  let response: Response;
   
  describe('Testing successful interactions', function () {

    beforeEach(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(validUser as User);
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('1 - Should login and receive a token with correct credentials', async function () {
      response = await chai
      .request(app)
      .post(loginRoute)
      .send(validLogin);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });

    it('2 - Should return the correct role when the token is given', async function () {
      response = await chai
      .request(app)
      .get(roleRoute)
      .set({ 'Authorization': token });

      expect(response.body).to.deep.equal({ role: 'user' });
    });
  });

  describe('Testing errors', function () {
    it('1 - Should throw an error if no email is given', async function () {
      response = await chai
      .request(app)
      .post(loginRoute)
      .send({ password: validLogin.password });
      
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('2 - Should throw an error if password is incorrect', async function () {
      response = await chai
      .request(app)
      .post(loginRoute)
      .send({ email: validLogin.email, password: '1234567' });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
    });

    it('3 - Should throw an error if email is incorrect', async function () {
      response = await chai
      .request(app)
      .post(loginRoute)
      .send({ email: 'invalid', password: validLogin.password });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
    });

    it('4 - Should throw an error if no token is given when trying to get the role', async function () {
      response = await chai
      .request(app)
      .get(roleRoute);

      expect(response.body).to.deep.equal({ message: 'Token not found' });
    });

    it('5 - Should throw an error with invalid token', async function () {
      response = await chai
      .request(app)
      .get(roleRoute)
      .set({ 'Authorization': invalidToken });

      expect(response.body).to.deep.equal({ message: 'Token not found' });
    })
  });
});
