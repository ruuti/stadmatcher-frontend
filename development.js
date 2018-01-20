const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.development.config.js');
const compiler = webpack(config);
const extressroutes = require('./express-routes');
const helmet = require('helmet');

app.use(helmet())

app.use('/', extressroutes);

app.use(webpackDevMiddleware(compiler, {
	publicPath: "/static/",
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(3000);