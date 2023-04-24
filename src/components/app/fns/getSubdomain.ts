export default (_: { [key: string]: any }) => () => {
	const isLocalhost = window.location.hostname.includes("localhost");
	const __ = window.location.hostname.split(".");
	return __.length > (isLocalhost ? 0 : 2)
		? __[isLocalhost ? __.length - 2 : __.length - 3]
		: null;
};
