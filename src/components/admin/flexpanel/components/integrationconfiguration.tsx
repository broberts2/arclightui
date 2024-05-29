import React from "react";

export default (obj: any) => {
  const k = obj.fns.parseAdminDomainState().integration;
  const v =
    obj.D && obj.D.getintegrations && obj.D.getintegrations[k]
      ? obj.D.getintegrations[k]
      : null;
  return v ? (
    <div style={{ height: "100%", width: "100%" }}>
      <obj.Monaco
        refName={"Integration"}
        language={"json"}
        defaultValue={JSON.stringify(obj.D.getintegrations[k])}
        state={obj.state}
        setState={obj.setState}
      />
    </div>
  ) : null;
};
