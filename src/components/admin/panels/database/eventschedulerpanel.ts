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
    title: `Events`,
    backgroundImg: `https://highmountainlabs.io/cdn/arclight/media/hml.jpg`,
    controls: [
      {
        type: "Calendar",
        label: "Search",
      },
    ],
  });
