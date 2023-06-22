export default (_: { [key: string]: any }) =>
	(socket: { [key: string]: any }, fade: Function, cb: Function) =>
	async (obj: { username: string; password: string }, redirect?: string) => {
		//await fade(true);
		//cb(false);
		socket.emit("authenticate", {
			...obj,
			redirect,
		});
		//await fade(false);
	};
