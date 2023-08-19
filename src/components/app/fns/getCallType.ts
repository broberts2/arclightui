export default (s: string, i: string, local?: boolean) => {
  if (local) return [`D.${s}`, s];
  else if (s === "model") return [`D.getdatamodels`, `getdatamodels`];
  else if (s === "scripts") return [`D.getscripts`, `getscripts`];
  else if (s === "Form") return [`D.getforms`, `getforms`];
  else if (s === "Form Template")
    return [`D.getformtemplates`, `getformtemplates`];
  return [`D.getrecords_${s}.${i}`, `getrecords_${s}`];
};
