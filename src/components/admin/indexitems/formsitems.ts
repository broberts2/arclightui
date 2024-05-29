import draweritems_form from "../draweritems/form";

export default (D: any, fns: any) => {
  const Items = draweritems_form(
    D,
    fns
  )(
    // remove false flag to restore
    false &&
      D &&
      D.getdatamodels &&
      D.getdatamodels.records &&
      Array.isArray(D.getdatamodels.records) &&
      fns.calls
      ? [
          fns.calls.getforms
            ? { icon: "folder-open", text: "Forms", form: "Form" }
            : undefined,
          fns.calls.getformtemplates
            ? {
                icon: "file-contract",
                text: "Form Templates",
                form: "Form Template",
              }
            : undefined,
        ]
      : []
  );
  return {
    items: Items,
    icon: "tablet",
    text: "Forms",
    cond: Items.length,
  };
};
