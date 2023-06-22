import draweritems_scripts from "../draweritems/scripts";

export default (D: any, fns: any) => {
	const Items = draweritems_scripts(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records) &&
			D.getscripts &&
			D.getscripts.records
			? [{ icon: "node-js", text: "Scripts", script: "scripts" }]
			: []
	);
	return {
		items: Items,
		icon: "node",
		text: "Scripts",
		cond: Items.length,
	};
};
