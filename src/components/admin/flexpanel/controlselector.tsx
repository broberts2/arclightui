import TextField from "../../textfield";
import ListPanel from "../../listpanel";
import PickList from "../../picklist";
import HeroPanel from "../../heropanel";
import Monaco from "../../monaco";
import Application from "../../application";
import textfield from "./components/textfield";
import dynamicfield from "./components/dynamicfield";
import listpanel from "./components/listpanel";
import picklist from "./components/picklist";
import monaco from "./components/monaco";
import integrationelector from "./components/integrationselector";
import integrationconfiguration from "./components/integrationconfiguration";
import scriptconfiguration from "./components/scriptconfiguration";
import Checkbox from "../../checkbox";
import app from "./components/app";
import application from "./components/application";

const __conditions = (obj: any) => ({
	condition1:
		obj.D &&
		obj.c &&
		obj.c.label &&
		obj.state &&
		obj.state._id &&
		obj.state[obj.c.label] === undefined &&
		(obj.searchOn === "model"
			? obj.D.getdatamodels
			: obj.D[`getrecords_${obj.searchOn}`]),
	condition2:
		obj.D && obj.D.getdatamodels && obj.D.getdatamodels.records
			? obj.D.getdatamodels.records.find((el: any) => el._id === obj.state._id)
			: false,
	condition3:
		obj.D[`getrecords_${obj.searchOn}`] &&
		obj.D[`getrecords_${obj.searchOn}`].init &&
		obj.D[`getrecords_${obj.searchOn}`].init.records,
});

export default (obj) => {
	if (obj.c) {
		const conditions = __conditions(obj);
		if (conditions.condition1) {
			const v = conditions.condition2;
			if (obj.searchOn === "model") {
				if (v && v[obj.c.label])
					obj.state[obj.c.label] =
						typeof v[obj.c.label] === "object"
							? {
									key: obj.c.label,
									type: v[obj.c.label]._type,
									lookup: obj.c.lookup,
									required: obj.c.required,
									system: v._system,
							  }
							: v[obj.c.label];
				if (v) obj.state._system = v._system;
			} else if (conditions.condition3) {
				const value = obj.D[`getrecords_${obj.searchOn}`].init.records.find(
					(el: any) => el._id === obj.state._id
				);
				if (value) obj.state[obj.c.label] = value[obj.c.label];
			}
		}
		switch (obj.c.type) {
			case "Monaco":
				return monaco(obj.c, obj.i, Monaco, obj.state, obj.setState);
			case "Boolean":
				return picklist(
					obj.c,
					obj.i,
					PickList,
					obj.state,
					obj.setState,
					obj.D,
					obj.fns
				);
			case "App":
				return app(obj.state, obj.setState, obj.D, obj.fns, obj.publicURI);
			case "TextField":
				return textfield(obj.c, obj.i, TextField, obj.state, obj.setState);
			case "TextFieldNumber":
				return (
					<div className={``}>
						<TextField
							span
							hot
							value={obj.state[obj.c.label]}
							onChange={(e: any) =>
								obj.setState((_: any) => ({
									..._,
									[obj.c.label]:
										e.target.value && e.target.value.length > 0
											? parseInt(e.target.value)
											: null,
								}))
							}
							type={"text"}
							key={obj.i}
							label={obj.c.label}
							variant="standard"
						/>
					</div>
				);
			case "PasswordField":
				return (
					<TextField
						span
						hot
						value={obj.state[obj.c.label]}
						onChange={(e: any) =>
							obj.setState((_: any) => ({
								..._,
								[obj.c.label]: e.target.value,
							}))
						}
						type={"password"}
						key={obj.i}
						label={obj.c.label}
						variant="standard"
					/>
				);
			case "SinglePickList":
				return picklist(
					obj.c,
					obj.i,
					PickList,
					obj.state,
					obj.setState,
					obj.D,
					obj.fns
				);
			case "PickList":
				return picklist(
					obj.c,
					obj.i,
					PickList,
					obj.state,
					obj.setState,
					obj.D,
					obj.fns,
					true
				);
			case "ListPanel":
				return listpanel(
					obj.state._items[obj.i].listquery,
					obj.c,
					obj.i,
					ListPanel,
					obj.state,
					obj.setState,
					obj.fns,
					obj.D
				);
			case "DynamicField":
				return dynamicfield(
					obj.c,
					obj.i,
					TextField,
					PickList,
					Checkbox,
					obj.Bttn,
					obj.state,
					obj.setState,
					obj.D,
					obj.fns
				);
			case "IntegrationSelector":
				return integrationelector(
					obj.c,
					obj.i,
					HeroPanel,
					obj.state,
					obj.setState,
					obj.fns,
					obj.D,
					obj.publicURI
				);
			case "IntegrationMonaco":
				return integrationconfiguration(
					obj.c,
					obj.i,
					Monaco,
					obj.state,
					obj.setState,
					obj.fns,
					obj.D
				);
			case "ScriptMonaco":
				return scriptconfiguration(
					obj.c,
					obj.i,
					Monaco,
					obj.state,
					obj.setState,
					obj.fns,
					obj.D
				);
			case "Application":
				return application(
					obj.c,
					obj.i,
					Application,
					obj.state,
					obj.setState,
					obj.fns,
					obj.D
				);
		}
	}
};
