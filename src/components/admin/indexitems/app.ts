import draweritems_app from "../draweritems/app";

export default (D: any, fns: any) => {
	const c =
		D && D.getintegrations
			? ["LoL Tournament API"].find((s: string) => D.getintegrations[s])
			: false;
	const Items = draweritems_app(
		D,
		fns
	)(
		c
			? [
					{
						icon: "diamond",
						text: "LoL Tournament API",
						app: "LoL Tournament API",
					},
			  ]
			: []
	);
	return {
		items: Items,
		icon: "superpowers",
		text: "Apps",
		cond: Items.length,
	};
};
