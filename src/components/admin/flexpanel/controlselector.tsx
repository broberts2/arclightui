import TextField from "../../textfield";
import DateSelector from "../../dateselector";
import Calendar from "../../calendar";
import ListPanel from "../../listpanel";
import PickList from "../../picklist";
import HeroPanel from "../../heropanel";
import ArticlePage from "../../articlepage";
import Monaco from "../../monaco";
import Application from "../../application";
import textfield from "./components/textfield";
import articlepage from "./components/articlepage";
import dateselector from "./components/dateselector";
import dynamicfield from "./components/dynamicfield";
import listpanel from "./components/listpanel";
import picklist from "./components/picklist";
import calendar from "./components/calendar";
import monaco from "./components/monaco";
import formselector from "./components/formselector";
import scriptselector from "./components/scriptselector";
import integrationelector from "./components/integrationselector";
import integrationconfiguration from "./components/integrationconfiguration";
import scriptconfiguration from "./components/scriptconfiguration";
import Checkbox from "../../checkbox";
import app from "./components/app";
import application from "./components/application";

const __conditions = (obj: any) => ({
  condition1:
    obj.D &&
    obj.c?.label &&
    obj.state?._id &&
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
        return monaco({ ...obj, Monaco });
      case "Boolean":
        return picklist({ ...obj, PickList });
      case "App":
        return app({ ...obj });
      case "ArticlePage":
        return articlepage({ ...obj, ArticlePage });
      case "TextField":
        return textfield({ ...obj, TextField });
      case "Date":
        return dateselector(
          obj.c,
          obj.i,
          DateSelector,
          obj.state,
          obj.setState
        );
      case "Calendar":
        return calendar({ ...obj, Calendar });
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
        return picklist({ ...obj, PickList });
      case "PickList":
        return picklist({ ...obj, PickList }, true);
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
        return dynamicfield({ ...obj, TextField, PickList, Checkbox });
      case "FormSelector":
        return formselector({ ...obj, ListPanel });
      case "ScriptSelector":
        return scriptselector({ ...obj, ListPanel });
      case "IntegrationSelector":
        return integrationelector({ ...obj, HeroPanel });
      case "IntegrationMonaco":
        return integrationconfiguration({ ...obj, Monaco });
      case "ScriptMonaco":
        return scriptconfiguration({ ...obj, Monaco });
      case "Application":
        return application({ ...obj, Application });
    }
  }
};
