import draweritems_database from "../draweritems/database";

export default (D: any, fns: any) => {
  const Items = draweritems_database(
    D,
    fns
  )(
    D && D.getdatamodels && Array.isArray(D.getdatamodels)
      ? D.getdatamodels.map((el: any) => Object.assign({ model: el._type }, el))
      : []
  );
  return {
    items: Items,
    icon: "fire-flame-simple",
    text: "Database",
    cond: Items.length,
  };
};
