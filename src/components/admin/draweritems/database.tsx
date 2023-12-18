export default (D: any, fns: any) => (items: any) => {
  const Categories = { _: { items: [] } };
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
  items
    .filter(
      (entity: any) =>
        entity.model === "model" || fns.calls[`getrecords_${entity.model}`]
    )
    .map((entity: any) => {
      if (
        entity.category &&
        entity.category.length &&
        !Categories[entity.category]
      )
        Categories[entity.category] = { icon: entity.icon, items: [] };
      Categories[
        entity.category && entity.category.length ? entity.category : "_"
      ].items.push({
        italic: false,
        color: entity.model === "model" ? null : null,
        icon: entity.subicon,
        text: entity.text,
        onClick: () => {
          return fns.setAdminDomainState({
            ...fns.parseAdminDomainState(),
            activePanel: entity.model === "event" ? 2 : 0,
            item: entity.model,
          });
        },
      });
    });
  return Object.keys(Categories)
    .filter((k: string) => k !== "_")
    .map((text: string) => ({
      italic: true,
      color: null,
      icon: Categories[text].icon,
      text,
      items: Categories[text].items,
      onClick: () => {},
    }))
    .concat(Categories._.items);
};
