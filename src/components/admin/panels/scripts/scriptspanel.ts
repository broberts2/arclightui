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
    title: `Scripts`,
    backgroundImg: `${endpoint}/static/defaultart/nodejs.jpg`,
    controls: [
      {
        cards: [
          "before-get",
          "after-get",
          "before-update",
          "after-update",
          "before-create",
          "after-create",
          "before-delete",
          "after-delete",
          "universal",
        ].map((k: string) => ({
          img: `${endpoint}/static/defaultart/js.jpg`,
          name: k,
          onClick: () => {
            fns.setAdminDomainState({
              ...fns.parseAdminDomainState(),
              activePanel: 1,
              script: k,
            });
          },
        })),
        type: "ListPanel",
        label: "Search",
      },
    ],
  });
