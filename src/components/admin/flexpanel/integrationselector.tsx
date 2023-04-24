export default (
	c: { [key: string]: any },
	i: any,
	HeroPanel: any,
	state: { [key: string]: any },
	setState: Function,
	fns: any,
	D: any,
	publicURI: string
) => {
	const C = D && D.getintegrations ? Object.keys(D.getintegrations) : null;
	return C ? (
		<div style={{ height: "400px", width: "100%" }}>
			<HeroPanel
				small
				autoSort
				cards={C.map((k: string) => ({
					active: D.getintegrations[k].active,
					hoverComponent: (
						<div>
							<div className={`text-md`}>
								{D.getintegrations[k].decorators.description}
							</div>
						</div>
					),
					bgImg: `${publicURI}/${D.getintegrations[k].decorators.img}`,
					subText: k,
					onClick: () =>
						fns.setAdminDomainState({
							...fns.parseAdminDomainState(),
							integration: k,
							activePanel: 1,
						}),
				}))}
			/>
		</div>
	) : null;
};
