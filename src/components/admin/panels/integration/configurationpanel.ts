import { StringLiteralType } from "typescript";

export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
	(
		D: any,
		Constructors: any,
		fns: any,
		key: StringLiteralType,
		endpoint: string
	) =>
	(currentState: { [key: string]: any }, updateState: Function) => ({
		title: `${fns.parseAdminDomainState().integration}`,
		backgroundImg: `${endpoint}/static/defaultart/integration.jpg`,
		controls: [
			{ type: "IntegrationMonaco", label: "Search", onClick: () => null },
		],
		onUpdate: () => {
			return fns.calls.updateintegrations({
				integration: fns.parseAdminDomainState().integration,
				value: currentState.MonacoRef.Integration.current.getValue(),
			});
		},
		onBack: () =>
			fns.setAdminDomainState({
				...fns.parseAdminDomainState(),
				integration: undefined,
				activePanel: 0,
			}),
	});
