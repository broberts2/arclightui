import Checkbox from "../../checkbox";
import React from "react";

const ChkBox = (props: { v: boolean; a: Function; t: string }) => (
  <div
    className={`text-text-primary font-primary text-base flex justify-start`}
  >
    <div className={`m-auto`}>
      <Checkbox
        value={props.v}
        onChange={(b: boolean, cb: Function) => props.a()}
      />
    </div>
    <div className={`m-auto`}>{props.t}</div>
  </div>
);

export default (props: any) => {
  const endpontarr = ["get", "post", "put", "delete"];
  const arr = {
    public: [
      { c: "onPublicRead", s: "publicread" },
      { c: "onPublicEdit", s: "publicedit" },
      { c: "onPublicCreate", s: "publiccreate" },
      { c: "onPublicDelete", s: "publicdelete" },
    ],
    owner: [
      { c: "onOwnerRead", s: "ownerread" },
      { c: "onOwnerEdit", s: "owneredit" },
      { c: "onOwnerCreate", s: "ownercreate" },
      { c: "onOwnerDelete", s: "ownerdelete" },
    ],
  };
  React.useEffect(() => {
    if (
      props.onScript &&
      props.fns &&
      props.fns.calls &&
      props.fns.calls.getscripts
    )
      props.fns.calls.getscripts();
  }, []);
  return (
    <props.Styles.ItemContent
      className={`w-full h-full rounded ${
        props.constrain ? "max-w-xl" : null
      } p-5 max-h-full`}
    >
      <div className={"flex justify-center items-center w-full h-full"}>
        <div className={"w-full space-y-8 h-full"}>
          <div
            className={`flex justify-start w-full space-y-4`}
            style={{ maxHeight: "85%", minHeight: "85%" }}
          >
            <div className={`w-full space-y-4`}>
              {props.children}
              {Object.keys(arr).map((k: string) =>
                arr[k].find((o: { c: string; s: string }) => props[o.c]) ? (
                  <props.Picklist
                    multiple
                    unlinked
                    disallowNone
                    span
                    hot
                    value={Object.keys(props.state).filter(
                      (kk: string) =>
                        arr[k].find((el: any) => el.s === kk) && props.state[kk]
                    )}
                    list={arr[k].map((o: { c: string; s: string }) => ({
                      text: o.s,
                      value: o.s,
                    }))}
                    onChange={(e: any) => {
                      const _ = {};
                      arr[k].map(
                        (el: any) => (_[el.s] = e.target.value.includes(el.s))
                      );
                      props.setState((s: any) => ({ ...s, ..._ }));
                    }}
                    key={0}
                    label={`${k.charAt(0).toUpperCase()}${k
                      .slice(1)
                      .toLowerCase()} Access`}
                    variant="standard"
                  />
                ) : null
              )}
              {props.onAccessType ? (
                <props.Picklist
                  unlinked
                  disallowNone
                  span
                  hot
                  value={props.state.accesstype}
                  list={endpontarr.map((s: string) => ({
                    text: s,
                    value: s,
                  }))}
                  onChange={(e: any) => {
                    props.setState((s: any) => ({
                      ...s,
                      accesstype: e.target.value,
                    }));
                  }}
                  key={0}
                  label={"accesstype"}
                  variant="standard"
                />
              ) : null}
              {props.onScript &&
              props.D &&
              props.D.getscripts &&
              props.D.getscripts.records &&
              props.D.getscripts.records.endpoint ? (
                <props.Picklist
                  unlinked
                  disallowNone
                  span
                  hot
                  value={props.state.script}
                  list={Object.keys(props.D.getscripts.records.endpoint).map(
                    (s: string) => ({
                      text: s,
                      value: s,
                    })
                  )}
                  onChange={(e: any) => {
                    props.setState((s: any) => ({
                      ...s,
                      script: e.target.value,
                    }));
                  }}
                  key={0}
                  label={"script"}
                  variant="standard"
                />
              ) : null}
            </div>
          </div>
          <div className={`flex flex-row w-full`}>
            <div className={`flex justify-start space-x-2 w-1/3`}>
              {[{ fn: "onRecursiveInit", t: "Recursive Init" }]
                .filter((el) => props[el.fn])
                .map((el) => (
                  <ChkBox
                    v={props.state.recursiveinit}
                    t={el.t}
                    a={() =>
                      props[el.fn]((s: Object) =>
                        props.setState((_: Object) => ({ ..._, ...s }))
                      )
                    }
                  />
                ))}
            </div>
            <div className={`flex justify-end space-x-2 w-full`}>
              {[
                { fn: "onExecute", t: "Execute" },
                { fn: "onLog", t: "Log" },
                { fn: "onAddField", t: "Add Field" },
                { fn: "onCreate", t: "Create" },
                { fn: "onSubmit", t: "Submit" },
                { fn: "onUpdate", t: "Update" },
                { fn: "onDelete", t: "Delete" },
                { fn: "onBack", t: "Back" },
              ]
                .filter(
                  (el) => props[el.fn] && !(props.state && props.state.onDelete)
                )
                .map((el) => (
                  <props.Bttn
                    t={el.t}
                    a={() =>
                      props[el.fn]((s: Object) =>
                        props.setState((_: Object) => ({ ..._, ...s }))
                      )
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </props.Styles.ItemContent>
  );
};
