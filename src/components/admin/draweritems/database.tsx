export default (D: any, fns: any) => (items: any) => {
  if (
    fns.calls &&
    fns.calls.getdatamodels &&
    ["create", "update", "delete"].some(
      (el: string) => fns.calls[`${el}datamodels`]
    )
  )
    items = items.concat({
      text: "Data Models",
      model: "model",
      icon: "database",
      subicon: "server",
    });
  return items
    .filter(
      (entity: any) =>
        entity.model === "model" || fns.calls[`getrecords_${entity.model}`]
    )
    .map((entity: any) => ({
      italic: true,
      color: entity.model === "model" ? null : null,
      icon: entity.icon,
      text: entity.text,
      onClick: () => {
        return fns.setAdminDomainState({
          ...fns.parseAdminDomainState(),
          activePanel: 0,
          item: entity.model,
        });
      },
    }));
};
