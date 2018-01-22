import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Template from './template';
import App from './App';
import routes from './src/routes-server';
import express from 'express';
const router = express.Router();

export default function serverRenderer({ clientStats, serverStats }) {

	router.get(['/', '/match/:matchId'], function(req, res) {
		const promises = [];

		routes.some(route => {
		  const match = matchPath(req.url, route)
		  if (match)
		    promises.push(route.loadData(match))
		  return match
		});

		Promise.all(promises)
			.then(function(results) {
				const context = {};
				const markup = ReactDOMServer.renderToString(
					<StaticRouter location={ req.url } context={ context }>
						<App {...results[0]} />
					</StaticRouter>
				);
		    const helmet = Helmet.renderStatic();

				res.status(200).send(Template({
					markup: markup,
		      helmet: helmet,
		      preloadedState : results[0]
				}));
			});
	});

	return router;
}