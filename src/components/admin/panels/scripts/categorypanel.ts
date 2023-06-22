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
		title: `Manage (${fns.parseAdminDomainState().script}) Scripts`,
		controls:
			D && D.getscripts && fns.parseAdminDomainState().script
				? [
						{
							cards: D.getscripts.records[fns.parseAdminDomainState().script]
								? Object.keys(
										D.getscripts.records[fns.parseAdminDomainState().script]
								  ).map((k: string) => {
										return {
											img: `${endpoint}/static/defaultart/${
												JSON.parse(
													D.getscripts.records[
														fns.parseAdminDomainState().script
													][k].metadata
												).managed
													? "js-m"
													: "js"
											}.jpg`,
											name: k,
											onClick: () => {
												fns.setAdminDomainState({
													...fns.parseAdminDomainState(),
													activePanel: 2,
													selectedscript: k,
												});
											},
										};
								  })
								: [],
							type: "ListPanel",
							label: "Search",
						},
				  ]
				: [],
		onCreate: () => {
			fns.setAdminDomainState({
				...fns.parseAdminDomainState(),
				activePanel: 2,
				selectedscript: undefined,
			});
		},
		onBack: () =>
			fns.setAdminDomainState({
				...fns.parseAdminDomainState(),
				activePanel: 0,
				script: undefined,
			}),
	});
