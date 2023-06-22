import draweritems_integration from "../draweritems/integration";

export default (D: any, fns: any) => {
	const Items = draweritems_integration(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records)
			? [{ icon: "bolt", text: "Integrations", integration: "integrations" }]
			: []
	);
	return {
		items: Items,
		icon: "cloud-bolt",
		text: "Integrations",
		cond: Items.length,
	};
};
