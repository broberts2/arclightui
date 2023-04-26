export default (_: { [key: string]: any }) => () => ({
	subdomain: _.getSubdomain(),
	route: window.location.pathname,
	query: Object.fromEntries(
		new URLSearchParams(window.location.search).entries()
	),
});
