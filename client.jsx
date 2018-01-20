import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';

ReactGA.initialize('UA-112815429-1');
if(window){
	ReactGA.pageview(window.location.pathname + window.location.search);
}

const history = createHistory();
const unlisten = history.listen((location, action) => {
  ReactGA.pageview(location.pathname+location.search);
});

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

ReactDOM.render((
	<Router history={history}>
		<App preloadedState={preloadedState} />
	</Router>
), document.getElementById('root'));