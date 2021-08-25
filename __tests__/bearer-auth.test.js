'use strict';

process.env.SECRET = "toes";
const middleware = require('../src/middleware/bearer-auth');
const { db, users } = require('../src/models/index');
const {app} = require('../server');
const supertest = require('supertest');
const request = supertest(app);
// const base64 = require('base-64');

const jwt = require('jsonwebtoken')

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
// beforeAll(async () => {
//   await db.sync();
//   await users.create(userInfo.admin);

// });


describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalledWith();
        });

    });

  });

});