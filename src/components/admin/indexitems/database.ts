import draweritems_database from "../draweritems/database";

export default (D: any, fns: any) => {
	const Items = draweritems_database(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records)
			? D.getdatamodels.records.map((el: any) =>
					Object.assign({ model: el._type }, el)
			  )
			: []
	);
	return {
		items: Items,
		icon: "toilet-portable",
		text: "Database",
		cond: Items.length,
	};
};
