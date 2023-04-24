export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
	(D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
	(currentState: { [key: string]: any }, updateState: Function) => ({
		backgroundImg: (() => {
			switch (fns.parseAdminDomainState().subItem) {
				case "Build Tournament Code(s)":
					return `${endpoint}/static/defaultart/ionia_1.jpg`;
				case "Authenticate Summoner":
					return `${endpoint}/static/defaultart/ionia_2.png`;
				case "Import by Tournament Code":
					return `${endpoint}/static/defaultart/ionia_3.jpg`;
			}
		})(),
		controls: [{ type: "App", label: "Search", onClick: () => null }],
		onBack: () =>
			fns.setAdminDomainState({
				...fns.parseAdminDomainState(),
				activePanel: 0,
			}),
	});
