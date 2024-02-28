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
    title: `Script Scheduler`,
    backgroundImg: `http://highmountainlabs.io/cdn/arclight/media/1.jpg`,
    controls: [
      {
        type: "Calendar",
        label: "Search",
        script: true,
      },
    ],
  });
