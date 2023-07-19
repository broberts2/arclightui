export default (D: any, fns: any) => (items: any) => {
	return items.map((entity: any) => ({
		italic: true,
		isExpanded: fns.parseAdminDomainState()[entity.app],
		icon: entity.icon,
		text: entity.text,
		onClick: () => {
			return fns.setAdminDomainState({
				...fns.parseAdminDomainState(),
				activePanel: 0,
				item: entity.app,
			});
		},
	}));
};
