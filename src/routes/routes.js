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
})