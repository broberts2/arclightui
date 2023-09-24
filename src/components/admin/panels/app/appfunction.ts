export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    backgroundImg: (() => {
      switch (fns.parseAdminDomainState().subItem) {
        case "Tournament Codes":
          return `http://highmountainlabs.io/arclight/cdn/media/ionia_1.jpg`;
        case "Authenticate Summoner":
          return `http://highmountainlabs.io/arclight/cdn/media/ionia_2.png`;
        case "Import Game Data":
          return `http://highmountainlabs.io/arclight/cdn/media/ionia_3.jpg`;
      }
    })(),
    controls: [{ type: "App", label: "Search", onClick: () => null }],
    onBack: () =>
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 0,
      }),
  });
