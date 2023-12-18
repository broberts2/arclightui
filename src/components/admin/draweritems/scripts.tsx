export default (D: any, fns: any) => (items: any) => {
  return items.map((entity: any) => ({
    italic: true,
    isExpanded: fns.parseAdminDomainState()[entity.script],
    icon: entity.icon,
    text: entity.text,
    onClick: () => {
      return fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: entity.type ? 3 : 0,
        item: entity.script || entity.type,
        script: undefined,
      });
    },
  }));
};
