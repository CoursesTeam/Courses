'use strict';

const express = require('express');
const app = express();

// error handlers
const notFoundHandler = require('./src/error-handlers/404');
const errorHandler = require('./src/error-handlers/500');

const acl = require('./src/middleware/acl');
const basicAuth = require('./src/middleware/basic-auth');
const bearerAuth = require('./src/middleware/bearer-auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(acl)
app.use(basicAuth)
app.use(bearerAuth)


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    app: app,
    start: (PORT) => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    }
}