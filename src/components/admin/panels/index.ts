import DatabaseListPanel from "./database/listpanel";
import DatabaseRecordPanel from "./database/recordpanel";

import IntegrationsPanel from "./integration/integrationpanel";
import ConfigurationPanel from "./integration/configurationpanel";

import ScriptsPanel from "./scripts/scriptspanel";
import CategoryPanel from "./scripts/categorypanel";
import ScriptEditPanel from "./scripts/scripteditpanel";

import AppRouter from "./app/approuter";
import AppFunction from "./app/appfunction";

const PROTECTED_NAMES = ["administrator", "default"];

const xFormKey = (key: string) =>
	`${key.slice(0, 1).toUpperCase()}${key.slice(1)}${
		key.slice(-1) !== "s" ? "s" : ""
	}`.replace("*", "(Integration) ");

const setTitle = (object: any) => {
	if (!object) return "";
	else if (object.username) return object.username;
	else if (object.name) return object.name;
	else if (object.title) return object.title;
	else if (object._type) return object._type;
	return "New";
};

const isProtectedRecord = (currentState: any) => {
	if (currentState)
		for (let i = 0; i < PROTECTED_NAMES.length; i++)
			if (
				PROTECTED_NAMES.some(
					(el: string) =>
						el === currentState.name || el === currentState.username
				)
			)
				return PROTECTED_NAMES;
};

const Panels: any = {
	Database: [DatabaseListPanel, DatabaseRecordPanel].map((panel: any) =>
		panel(xFormKey, setTitle, isProtectedRecord)
	),
	Integrations: [IntegrationsPanel, ConfigurationPanel].map((panel: any) =>
		panel(xFormKey, setTitle, isProtectedRecord)
	),
	Scripts: [ScriptsPanel, CategoryPanel, ScriptEditPanel].map((panel: any) =>
		panel(xFormKey, setTitle, isProtectedRecord)
	),
	Apps: [AppRouter, AppFunction].map((panel: any) =>
		panel(xFormKey, setTitle, isProtectedRecord)
	),
};

export default (D: any, Constructors: any, fns: any, endpoint: string) => {
	const key = fns.parseAdminDomainState().section;
	const item = fns.parseAdminDomainState().item;
	return key && Panels[key] && item
		? Panels[key].map((P: any) => P(D, Constructors, fns, item, endpoint))
		: [];
};
