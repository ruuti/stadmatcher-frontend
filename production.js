const express = require('express');
const path = require('path');
const app = express();
const extressroutes = require('./express-routes');

const ClientStatsPath = path.join(__dirname, './static/stats.json');
const ServerRendererPath = path.join(__dirname, './static/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const Stats = require(ClientStatsPath);

const helmet = require('helmet');
app.use(helmet());

app.use('/', extressroutes);

app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/', express.static(path.join(__dirname, './public_www')));

app.use(ServerRenderer(Stats));

app.listen(3000);