import draweritems_scripts from "../draweritems/scripts";

export default (D: any, fns: any) => {
	const Items = draweritems_scripts(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records)
			? [
					{ icon: "file-contract", text: "Forms", event: "form" },
					{
						icon: "file-contract",
						text: "Form Templates",
						event: "formtemplate",
					},
			  ]
			: []
	);
	return {
		items: Items,
		icon: "file-signature",
		text: "Forms",
		cond: Items.length,
	};
};
