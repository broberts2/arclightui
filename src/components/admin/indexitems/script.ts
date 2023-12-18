import draweritems_scripts from "../draweritems/scripts";

export default (D: any, fns: any) => {
  const Items = draweritems_scripts(
    D,
    fns
  )(
    D?.getdatamodels?.records &&
      Array.isArray(D.getdatamodels.records) &&
      fns?.calls?.getscripts
      ? [
          { icon: "calendar", text: "Scheduler", type: "scriptcalendar" },
          { icon: "node-js", text: "Scripts", script: "scripts" },
        ]
      : []
  );
  return {
    items: Items,
    icon: "node",
    text: "Scripts",
    cond: Items.length,
  };
};
