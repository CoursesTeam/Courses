'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middleware/basic-auth');
const bearerAuth = require('../middleware/bearer-auth');
const acl = require('../middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
    try {
        let userRecord = await users.create(req.body);
        const output = {
            user: userRecord,
            token: userRecord.token,
            role: userRecord.role
        };
        res.status(201).json(output)
    } catch (e) {
        next(e.message)
    }
})

authRouter.post('/signin',basicAuth, async (req, res, next) => {
    try {
        const user = {
            user: req.user,
            token: req.user.token
          };
          res.status(200).json(user);
    } catch (e) {
        next(e.message)
    }
})

authRouter.get('/users', bearerAuth,acl('read'), async (req, res, next) => {
    const userRecord = await users.findAll({});
    const list = userRecord.map(user => user.username);
    res.status(200).json(list);
  });
  
  authRouter.get('/secret', bearerAuth, async (req, res, next) => {
    res.status(200).send("Welcome to the secret area!")
  });



module.exports = authRouter