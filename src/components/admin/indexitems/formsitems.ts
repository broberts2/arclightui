import draweritems_form from "../draweritems/form";

export default (D: any, fns: any) => {
	const Items = draweritems_form(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records)
			? [
					{ icon: "folder-open", text: "Forms", form: "Form" },
					{
						icon: "file-contract",
						text: "Form Templates",
						form: "Form Template",
					},
			  ]
			: []
	);
	return {
		items: Items,
		icon: "tablet",
		text: "Forms",
		cond: Items.length,
	};
};
