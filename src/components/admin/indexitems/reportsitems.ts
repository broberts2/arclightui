import draweritems_reportsitems from "../draweritems/database";

export default (D: any, fns: any) => {
	const Items = draweritems_reportsitems(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records)
			? [
					{ icon: "chart-column", text: "Reports", event: "report" },
					{
						icon: "chart-column",
						text: "Report Templates",
						event: "reporttemplate",
					},
			  ]
			: []
	);
	return {
		items: Items,
		icon: "chart-pie",
		text: "Reports",
		cond: Items.length,
	};
};
