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
    backgroundImg: `https://highmountainlabs.io/cdn/arclight/media/1.jpg`,
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
          "custom-call",
          "custom-call-admin",
          "endpoint",
          "universal",
        ].map((k: string) => ({
          img: `https://highmountainlabs.io/cdn/arclight/media/js-c.jpg`,
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
