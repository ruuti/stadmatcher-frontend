import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

ReactDOM.render((
	<BrowserRouter>
		<App preloadedState={preloadedState} />
	</BrowserRouter>
), document.getElementById('root'));