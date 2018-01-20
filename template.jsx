const regexp = / data-react-helmet="true"/g
export default ({ markup, helmet, preloadedState }) => {
	return `<!doctype html>
		<html ${helmet.htmlAttributes.toString()}>
		<head>
			${helmet.title.toString().replace(regexp, '')}
			${helmet.meta.toString().replace(regexp, '')}
			${helmet.link.toString().replace(regexp, '')}
			<link rel="stylesheet" href="/static/styles.css" />
		</head>
		<body ${helmet.bodyAttributes.toString()}>
			<div id="root">${markup}</div>
			<script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
			<script src="/static/client.js" async></script>
		</body>
		</html>`;
};