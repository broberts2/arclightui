import React, { FC } from "react";
import * as Components from "../../components";
import Styles from "./styles";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

const typeFinder = (v: any) => {
  switch (typeof v) {
    case "function":
      return `${v.replace(/['"]+/g, "")}`;
    case "string":
      return `"${v}"`;
    case "boolean":
      return `${v}`;
  }
};

const Login: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const [viewingComponent, setViewingComponent] =
    React.useState<string>("Card");
  const [state, setState] = React.useState<any>({
    editorValue: undefined,
  });
  const [jsxValue, setJsxValue] = React.useState<string | undefined>(undefined);
  const buildJSX = (obj: any) => {
    obj = JSON.parse(obj);
    return setJsxValue(
      `<${viewingComponent} \n\t${Object.keys(obj)
        .map((k: string) => `${k}={${typeFinder(obj[k])}} `)
        .join("\n\t")}\n/>`
    );
  };
  const excludes = (n: string) => {
    switch (n) {
      case "Admin":
        return;
    }
    return true;
  };
  const Component = viewingComponent ? Components[viewingComponent] : null;
  const T = (props: { value: string }) => (
    <textarea
      className={`bg-transparent w-full resize-none outline-none`}
      style={{ height: `calc(100% - 42px)` }}
    >
      {props.value}
    </textarea>
  );
  React.useEffect(() => {
    if (!D?.getrecords_arclightui?.init?.records) return;
    if (state.editorValue) return;
    const doc = D?.getrecords_arclightui?.init.records.find(
      (R: any) => R.name === viewingComponent
    );
    const json = doc?.json;
    if (!json) return;
    setState({
      editorValue: json,
    });
    buildJSX(json);
  });
  return D?.getrecords_arclightui?.init?.records &&
    fns.calls &&
    state.editorValue &&
    jsxValue ? (
    <Components.Page
      fns={fns}
      backgroundGradient={{ from: `#283b4c`, to: `#09111c` }}
    >
      <Components.Drawer
        autoSort
        startOpen={true}
        locked={true}
        animation={"slide"}
        buttonSide="left"
        side="left"
        items={Object.keys(Components)
          .filter((k: string) => excludes(k))
          .map((k: string) => {
            const f = D.getrecords_arclightui.init.records.find(
              (R: any) => R.name === k
            );
            return {
              color: f ? "white" : "gray",
              italic: true,
              isExpanded: true,
              onClick: () => {
                if (f) {
                  const json = D?.getrecords_arclightui?.init.records.find(
                    (R: any) => R.name === k
                  ).json;
                  setState({
                    editorValue: json,
                  });
                  buildJSX(json);
                  setViewingComponent(k);
                }
              },
              icon: "gears",
              text: k,
            };
          })
          .sort((a: any, b: any) => (a.text < b.text ? -1 : 1))}
      />
      <Styles.Container className={`h-screen flex-col pl-72`}>
        <div className={`px-36`}>
          <Header fns={fns} endpoint={endpoint} />
        </div>
        <Styles.Body className={`mx-36 h-[700px] bg-gray-700 rounded flex`}>
          <div
            className={`h-full w-2/3 relative flex justify-center items-center p-5`}
          >
            <Component
              {...JSON.parse(state.editorValue)}
              onClick={() => {
                if (JSON.parse(state.editorValue).onClick) {
                  try {
                    eval(JSON.parse(state.editorValue).onClick)();
                  } catch (e) {}
                }
              }}
            />
          </div>
          <div className={`h-full w-1/3 flex`}>
            <div className={`flex-col w-full h-full`}>
              <div className={`h-2/3 w-full relative flex p-5`}>
                <Components.Monaco
                  refName={"editorValue"}
                  language={"json"}
                  defaultValue={state.editorValue}
                  state={state}
                  setState={setState}
                />
              </div>
              <div className={`h-1/3 w-full relative flex p-5`}>
                <div className={`flex-col w-full`}>
                  <T value={jsxValue} />
                  <Components.Button
                    span={true}
                    label={"Update Preview"}
                    type={"button"}
                    size={"md"}
                    animation={true}
                    onClick={(status: any) => {
                      const v = state.MonacoRef.editorValue.current.getValue();
                      setState({
                        ...state,
                        editorValue: v,
                      });
                      buildJSX(v);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Styles.Body>
      </Styles.Container>
    </Components.Page>
  ) : null;
};

export default Login;
