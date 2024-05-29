export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    title: `${xFormKey(key.replace(/_/g, ""))}`,
    backgroundImg: `https://highmountainlabs.io/cdn/arclight/media/hml.jpg`,
    controls: [
      {
        type: "FormSelector",
        label: "Search",
      },
    ],
    onCreate:
      (!fns.parseAdminDomainState().activePanel &&
        fns.parseAdminDomainState().item === "Form") ||
      !fns.calls.createformtemplates
        ? null
        : () => null,
    onBack: fns.parseAdminDomainState().activePanel
      ? () =>
          fns.setAdminDomainState({
            ...fns.parseAdminDomainState(),
            activePanel: 0,
            formname: undefined,
            formtemplate: undefined,
          })
      : null,
  });
