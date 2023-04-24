export default (_: { [key: string]: any }) =>
	(cb: Function, recursive: Array<string>, init: boolean) => {
		if (_ && _.calls && !init) {
			if (_.calls.getdatamodels) _.calls.getdatamodels();
			Object.keys(_.calls).map((key: string) => {
				if (
					_.calls[key] &&
					(key.includes("getrecords") ||
						key.includes("getintegrations") ||
						key.includes("getscripts"))
				) {
					_.calls[key]({
						_recursive: recursive.find(
							(s: string) => key.split("getrecords_")[1] === s
						),
					});
				}
			});
			cb(true);
		}
	};
