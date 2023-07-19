export default (_: { [key: string]: any }, C: { [key: string]: any }) =>
	(token: string | null) => {
		if (token) C.set("authtoken", token, { path: "/" });
		else {
			C.remove("authtoken", { path: "/" });
			window.location.reload();
		}
	};
