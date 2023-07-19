import React from "react";

export default (
  c: { [key: string]: any },
  i: any,
  Monaco: any,
  state: { [key: string]: any },
  setState: Function,
  fns: any,
  D: any
) => {
  const k = fns.parseAdminDomainState().integration;
  const v =
    D && D.getintegrations && D.getintegrations[k]
      ? D.getintegrations[k]
      : null;
  return v ? (
    <div style={{ height: "100%", width: "100%" }}>
      <Monaco
        refName={"Integration"}
        language={"json"}
        defaultValue={JSON.stringify(D.getintegrations[k])}
        state={state}
        setState={setState}
      />
    </div>
  ) : null;
};
