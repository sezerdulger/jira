'use strict';
var config = require('./config.js');
let IssueMiddleware = require('./issue/middleware/issueMiddleware.js');

const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}

app.use(myLogger);
app.use(bodyParser.json());

var router = express.Router();
app.use('/api/1.0', router);

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

var port = config.app.port;
app.listen(port);

new IssueMiddleware(router);