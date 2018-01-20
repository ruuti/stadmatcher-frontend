export default ({ markup, helmet, preloadedState }) => {
	return `<!doctype html>
		<html ${helmet.htmlAttributes.toString()}>
		<head>
			${helmet.title.toString()}
			${helmet.meta.toString()}
			${helmet.link.toString()}
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