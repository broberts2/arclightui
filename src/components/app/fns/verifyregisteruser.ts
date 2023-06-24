export default (_: { [key: string]: any }) => (password: string) => {
	try {
		const q = _.readState();
		if (q && q.query && q.query.v && _.calls && _.calls.verifyregisteruser) {
			_.calls.verifyregisteruser({ v: q.query.v, password });
		}
	} catch (e) {
		return false;
	}
};
