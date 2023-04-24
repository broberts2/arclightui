import React from "react";
import PickList from "../../picklist";

export default (
  c: { [key: string]: any },
  i: any,
  Monaco: any,
  state: { [key: string]: any },
  setState: Function,
  fns: any,
  D: any
) => {
  const k = fns.parseAdminDomainState().script;
  const kk = fns.parseAdminDomainState().selectedscript;
  const v =
    kk && D && D.getscripts && D.getscripts[k] && D.getscripts[k][kk]
      ? D.getscripts[k][kk]
      : {
          metadata: `{
					"name": "newscript.js",
					"active": false,
					"context": "${k}"
					${k !== "universal" ? `,\n"model": "bindingmodel"` : ""}
				}`,
          fn: `async (ServerObject) => {\n\n};`,
        };
  const cc = state.scriptkey && state.scriptkey === "Script Logic";
  return v ? (
    <div style={{ height: "100%" }}>
      <PickList
        disallowNone
        span
        hot
        value={state.scriptkey ? state.scriptkey : "Metadata"}
        list={[
          { value: "Metadata", text: "Metadata" },
          { value: "Script Logic", text: "Script Logic" },
        ].filter(
          (el: any) =>
            fns.parseAdminDomainState().selectedscript ||
            el.value === "Metadata"
        )}
        onChange={(e: any) =>
          setState((_: any) => ({ ..._, scriptkey: e.target.value }))
        }
        key={0}
        label={"Source Control"}
        variant="standard"
      />
      <div
        key={state.scriptkey}
        style={{ height: "100%", maxHeight: "600px" }}
        className={`mt-5`}
      >
        <Monaco
          refName={cc ? "Script Logic" : "Metadata"}
          language={cc ? "javascript" : "json"}
          defaultValue={cc ? v.fn : v.metadata}
          state={state}
          setState={setState}
        />
      </div>
    </div>
  ) : null;
};