import React from "react";
import PickList from "../../../picklist";

export default (obj: any) => {
  const k = obj.fns.parseAdminDomainState().script;
  const kk = obj.fns.parseAdminDomainState().selectedscript;
  const v =
    kk &&
    obj.D &&
    obj.D.getscripts &&
    obj.D.getscripts.records &&
    obj.D.getscripts.records[k] &&
    obj.D.getscripts.records[k][kk]
      ? obj.D.getscripts.records[k][kk]
      : {
          metadata: `{
					"name": "newscript.js",
					"active": false,
					"context": "${k}"
					${
            k !== "universal" &&
            k !== "endpoint" &&
            k !== "custom-call" &&
            k !== "custom-call-admin"
              ? `,\n"model": "bindingmodel"`
              : ""
          }
          ${k === "custom-call" ? `,\n"profiles": ["administrator"]` : ""}
				}`,
          fn: `async (ServerObject) => {\n\n};`,
        };
  const cc = obj.state.scriptkey && obj.state.scriptkey === "Script Logic";
  return v ? (
    <div style={{ height: "100%" }}>
      <PickList
        unlinked={true}
        type={"script"}
        D={obj.D}
        fns={obj.fns}
        disallowNone
        span
        hot
        value={obj.state.scriptkey ? obj.state.scriptkey : "Metadata"}
        list={[
          { value: "Metadata", text: "Metadata" },
          { value: "Script Logic", text: "Script Logic" },
        ].filter(
          (el: any) =>
            obj.fns.parseAdminDomainState().selectedscript ||
            el.value === "Metadata"
        )}
        onChange={(e: any) =>
          obj.setState((_: any) => ({ ..._, scriptkey: e.target.value }))
        }
        keyname={0}
        label={"Source Control"}
        variant="standard"
      />
      <div
        key={obj.state.scriptkey}
        style={{ height: "100%", maxHeight: "600px" }}
        className={`arclight-mt-5`}
      >
        <obj.Monaco
          refName={cc ? "Script Logic" : "Metadata"}
          language={cc ? "javascript" : "json"}
          defaultValue={cc ? v.fn : v.metadata}
          state={obj.state}
          setState={obj.setState}
        />
      </div>
    </div>
  ) : null;
};
