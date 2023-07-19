export default (_: { [key: string]: any }) =>
	(obj: { [key: string]: any } | undefined | null) => {
		let __ = `?`;
		if (obj) Object.keys(obj).map((k: string) => (__ += `${k}=${obj[k]}`));
		const newurl =
			window.location.protocol +
			"//" +
			window.location.host +
			window.location.pathname;
		window.history.pushState(
			{ path: newurl },
			"",
			`${newurl}${obj && Object.keys(obj).length ? __ : ""}`
		);
	};
