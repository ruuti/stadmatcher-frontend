import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Template from './template';
import App from './App';
import DataSource from './src/DataSource';
import routes from './src/routes';

export default function serverRenderer({ clientStats, serverStats }) {
	return (req, res, next) => {

		const dataSource = new DataSource();
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
	};
}