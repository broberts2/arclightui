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
		title: `Manage Scripts`,
		controls:
			D && D.getscripts
				? [
						{
							cards: [
								"before-get",
								"after-get",
								"before-update",
								"after-update",
								"before-create",
								"after-create",
								"before-delete",
								"after-delete",
								"universal",
							].map((k: string) => ({
								bgImg: `${endpoint}/static/defaultart/js.jpg`,
								subText: k,
								onClick: () => {
									fns.setAdminDomainState({
										...fns.parseAdminDomainState(),
										activePanel: 1,
										script: k,
									});
								},
							})),
							type: "ListPanel",
							label: "Search",
						},
				  ]
				: [],
	});
