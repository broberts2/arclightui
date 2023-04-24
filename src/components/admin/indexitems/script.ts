import draweritems_scripts from "../draweritems/scripts";

export default (D: any, fns: any) => {
  const Items = draweritems_scripts(
    D,
    fns
  )(
    D && D.getdatamodels && Array.isArray(D.getdatamodels) && D.getscripts
      ? [{ icon: "node-js", text: "Scripts", script: "scripts" }]
      : []
  );
  return {
    items: Items,
    icon: "node",
    text: "Scripts",
    cond: Items.length,
  };
};
