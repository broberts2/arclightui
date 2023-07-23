export default (D: any, fns: any) => (items: any) => {
  return items.map((entity: any) => ({
    italic: true,
    isExpanded: entity ? fns.parseAdminDomainState()[entity.form] : undefined,
    icon: entity ? entity.icon : undefined,
    text: entity ? entity.text : undefined,
    onClick: () => {
      if (!entity) return;
      return fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 0,
        item: entity.form,
        formtemplate: undefined,
        formname: undefined,
      });
    },
  }));
};
