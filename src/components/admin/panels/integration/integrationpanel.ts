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
    title: `Integrations`,
    backgroundImg: `${endpoint}/static/defaultart/integration.jpg`,
    controls: [{ type: "IntegrationSelector", label: "Search" }],
  });
