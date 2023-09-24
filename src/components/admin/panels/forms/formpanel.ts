export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    // title: `${xFormKey(key.replace(/_/g, ""))}`,
    backgroundImg: `http://highmountainlabs.io/arclight/cdn/media/1.jpg`,
    controls:
      D && D.getformtemplates && D.getformtemplates.records
        ? [
            {
              type: "Application",
              label: "Search",
            },
          ]
        : [],
    onBack: () =>
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: fns.parseAdminDomainState().item === "Form" ? 1 : 0,
        formname: undefined,
      }),
  });
