export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    backgroundImg: `${endpoint}/static/media/riotxlol.jpg`,
    controls: [{ type: "App", label: "Search", onClick: () => null }],
  });
