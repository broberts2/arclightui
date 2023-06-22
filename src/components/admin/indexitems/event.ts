import draweritems_event from "../draweritems/event";

export default (D: any, fns: any) => {
	const Items = draweritems_event(
		D,
		fns
	)(
		D &&
			D.getdatamodels &&
			D.getdatamodels.records &&
			Array.isArray(D.getdatamodels.records)
			? [{ icon: "calendar-week", text: "Events", event: "event" }]
			: []
	);
	return {
		items: Items,
		icon: "calendar",
		text: "Events",
		cond: Items.length,
	};
};
