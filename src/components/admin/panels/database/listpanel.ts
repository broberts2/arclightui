export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
	(D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
	(currentState: { [key: string]: any }, updateState: Function) => ({
		title: `Manage ${xFormKey(key.replace(/_/g, ""))}`,
		backgroundImg:
			D && D.getdatamodels && key !== "model"
				? D.getdatamodels.find((m: any) => m._type === key).metaimg
				: null,
		controls: [
			{
				cards: Constructors.constructFromRecordList(key).map((el: any) => ({
					bgImg:
						el.metaimg && el.metaimg.length
							? el.metaimg
							: el.img && el.img.length
							? el.img
							: `${endpoint}/static/integrationsart/daedalus.jpg`,
					subText: key === "model" ? el._type : setTitle(el),
					onClick: () => {
						updateState((_: any) => ({
							_id: el._id,
						}));
						fns.setAdminDomainState({
							...fns.parseAdminDomainState(),
							activePanel: 1,
							id: el._id,
						});
					},
				})),
				type: "ListPanel",
				label: "Search",
			},
		],
		onCreate:
			D &&
			D.getdatamodels &&
			(key !== "model"
				? fns && fns.calls && fns.calls[`createrecords_${key}`]
				: true)
				? () => {
						D.getdatamodels = D.getdatamodels.concat({
							_type: "model",
							type: "",
							text: "",
							icon: "",
							subicon: "",
							metaimg: "",
						});
						updateState((_: any) => ({
							_id: null,
						}));
						fns.setAdminDomainState({
							...fns.parseAdminDomainState(),
							_id: null,
							activePanel: 1,
						});
				  }
				: null,
	});
