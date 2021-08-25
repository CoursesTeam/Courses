'use strict';


require('dotenv').config()
const server = require('./server');
const { db } = require('./src/models/index.js');
db.sync()
  .then(() => {
    // Start the web server
    server.start(process.env.PORT||5000);
  }).catch(console.error);