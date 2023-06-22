export default (_: { [key: string]: any }) =>
	(D: any, cb: Function, fns: any, recursive: Array<string>, init: boolean) => {
		if (_ && _.calls && !init) {
			if (_.calls.getdatamodels) _.calls.getdatamodels();
			Object.keys(_.calls).map((key: string) => {
				if (
					_.calls[key] &&
					(key.includes("getrecords") ||
						key.includes("getintegrations") ||
						key.includes("getscripts"))
				) {
					_.calls[key]();
				}
			});
			Object.keys(_.calls).map((key: string) => {
				if (key.includes("recursiveinit")) {
					_.calls[key]({ _recursive: true });
				}
			});
			cb(true);
		}
	};
