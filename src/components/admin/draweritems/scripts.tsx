export default (D: any, fns: any) => (items: any) => {
  return items.map((entity: any) => ({
    italic: true,
    isExpanded: fns.parseAdminDomainState()[entity.script],
    icon: "node-js",
    text: entity.text,
    onClick: () => {
      return fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 0,
        item: entity.script,
        script: undefined,
      });
    },
  }));
};
