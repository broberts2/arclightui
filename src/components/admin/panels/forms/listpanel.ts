export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
	(D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
	(currentState: { [key: string]: any }, updateState: Function) => ({
		title: `${xFormKey(key.replace(/_/g, ""))}`,
		backgroundImg: `${endpoint}/static/defaultart/form.jpg`,
		controls: (() => {
			const __ = !fns.parseAdminDomainState().activePanel
				? "getformtemplates"
				: "getforms";
			const t = fns.parseAdminDomainState().formtemplate;
			if (
				!(D && D[__] && D[__].records) ||
				(!t && fns.parseAdminDomainState().activePanel)
			)
				return [];
			const arr = Array.isArray(D[__].records)
				? D[__].records
				: Object.keys(D[__].records[t]).map((k: string) => D[__].records[t][k]);
			return [
				{
					cards: arr.map((f: { [key: string]: any }) => {
						return {
							img: f.backgroundimage,
							name: f.__filename ? f.__filename : f.title,
							onClick: () => {
								fns.setAdminDomainState({
									...fns.parseAdminDomainState(),
									activePanel:
										fns.parseAdminDomainState().item === "Form"
											? !fns.parseAdminDomainState().activePanel
												? 1
												: 2
											: 2,
									formname: f.__filename
										? f.__filename.split(".")[0]
										: undefined,
									formtemplate: f.__template.split(".")[0],
								});
							},
						};
					}),
					type: "ListPanel",
					label: "Search",
				},
			];
		})(),
		onCreate:
			!fns.parseAdminDomainState().activePanel &&
			fns.parseAdminDomainState().item === "Form"
				? null
				: () => null,
		onBack: fns.parseAdminDomainState().activePanel
			? () =>
					fns.setAdminDomainState({
						...fns.parseAdminDomainState(),
						activePanel: 0,
						formname: undefined,
						formtemplate: undefined,
					})
			: null,
	});
