import { StringLiteralType } from "typescript";

export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (
    D: any,
    Constructors: any,
    fns: any,
    key: StringLiteralType,
    endpoint: string
  ) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    title: `(${fns.parseAdminDomainState().script}) Scripts`,
    backgroundImg: `https://highmountainlabs.io/cdn/arclight/media/2.jpg`,
    controls:
      D && D.getscripts && fns.parseAdminDomainState().script
        ? [
            {
              cards: D.getscripts.records[fns.parseAdminDomainState().script]
                ? Object.keys(
                    D.getscripts.records[fns.parseAdminDomainState().script]
                  ).map((k: string) => {
                    return {
                      img: `https://highmountainlabs.io/cdn/arclight/media/${
                        JSON.parse(
                          D.getscripts.records[
                            fns.parseAdminDomainState().script
                          ][k].metadata
                        ).managed
                          ? "js-m"
                          : "js"
                      }.jpg`,
                      name: k,
                      onClick: () => {
                        fns.setAdminDomainState({
                          ...fns.parseAdminDomainState(),
                          activePanel: 2,
                          selectedscript: k,
                        });
                      },
                    };
                  })
                : [],
              type: "ScriptSelector",
              label: "Search",
            },
          ]
        : [],
    onCreate: () => {
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 2,
        selectedscript: undefined,
      });
    },
    onBack: () =>
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 0,
        script: undefined,
      }),
  });
