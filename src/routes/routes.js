'use strict';

const express = require('express');
const authRouter = express.Router();

const { students } = require('../models/index');
const basicAuth = require('../middleware/basic-auth');
const bearerAuth = require('../middleware/bearer-auth');
const acl = require('../middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
    try {
        let studentRecord = await students.create(req.body);
        const output = {
            student: studentRecord,
            token: studentRecord.token,
            role: studentRecord.role
        };
        res.status(201).json(output)
    } catch (e) {
        next(e.message)
    }
});
authRouter.post('/signin', basicAuth, (req, res, next) => {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  });
  
  authRouter.get('/users', bearerAuth, acl('delete'), async (req, res, next) => {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  });
  
  authRouter.get('/secret', bearerAuth, async (req, res, next) => {
    res.status(200).send('Welcome to the secret area')
  });
  
  module.exports = authRouter;