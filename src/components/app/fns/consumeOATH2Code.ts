export default (_: { [key: string]: any }) =>
	(socket: any, query: { [key: string]: any }) => {
		if (!socket) return;
		if (query.code) {
			socket.emit("authenticate", {
				code: query.code,
				type: "Discord",
				subdomain: _.readState().subdomain,
				redirect: "/",
			});
		}
		const n = _.readState().query;
		delete n.code;
		delete n.error;
		delete n.error_description;
		_.setQueryParams({ ...n });
	};
