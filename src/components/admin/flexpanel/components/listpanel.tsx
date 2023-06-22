export default (
	listquery: Function,
	C: { [key: string]: any },
	i: any,
	ListPanel: any,
	state: { [key: string]: any },
	setState: Function,
	fns: any,
	D: any
) => {
	const type = fns.parseAdminDomainState().item;
	return (
		<div style={{ height: "100%" }}>
			<ListPanel
				loadwatcher={fns.parseAdminDomainState().activePanel}
				Request={{
					type,
					search: { limit: 32, skip: 0 },
					local: C.cards,
				}}
				fns={fns}
				D={C.cards ? { [type]: { records: C.cards } } : D}
				card={(c: any) =>
					type === "model"
						? {
								img: c.metaimg,
								subtext: c._type,
								onClick: () => {
									if (C.onClick) C.onClick(c);
									else c.onClick(c);
									if (listquery) listquery(type, c._id);
								},
						  }
						: {
								img: c.img,
								subtext: c.name || c.username,
								onClick: () => {
									if (C.onClick) C.onClick(c);
									else c.onClick(c);
									if (listquery) listquery(type, c._id);
								},
						  }
				}
				line={false}
				constrain
			/>
		</div>
	);
};
