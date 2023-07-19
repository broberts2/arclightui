export default (D: any, setD: Function, _: { [key: string]: any }) =>
	async (cb: Function) =>
		await cb();
