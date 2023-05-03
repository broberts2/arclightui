export default (
	C: { [key: string]: any },
	i: any,
	ListPanel: any,
	state: { [key: string]: any },
	setState: Function,
	fns: any,
	D: any
) => {
	return (
		<div style={{ height: "400px" }}>
			<ListPanel
				Request={{
					type: fns.parseAdminDomainState().item,
					search: { limit: 8 },
				}}
				fns={fns}
				D={D}
				card={(c: any) => ({
					img: c.img,
					subtext: c.name || c.username,
					onClick: () => C.onClick(c),
				})}
				line={false}
				constrain
			/>
		</div>
	);
};
