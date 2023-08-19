import React from "react";

const Panel = (props) => {
  return (
    <div>
      <props.ListPanel
        controls={[
          {
            icon: "diamond",
            text: "Name",
            key: "name",
          },
        ]}
        Request={{
          type:
            props.fns.parseAdminDomainState().activePanel === 1
              ? "Form"
              : "Form Template",
          search: { limit: 32 },
        }}
        fns={props.fns}
        D={props.D}
        card={(c: any) => ({
          img: c.backgroundimage,
          subtext: c.title,
          onClick: () => {
            props.fns.setAdminDomainState({
              ...props.fns.parseAdminDomainState(),
              activePanel:
                props.fns.parseAdminDomainState().item === "Form"
                  ? !props.fns.parseAdminDomainState().activePanel
                    ? 1
                    : 2
                  : 2,
              formname: c.__filename ? c.__filename.split(".")[0] : undefined,
              formtemplate: c.__template.split(".")[0],
            });
          },
        })}
        line={false}
        constrain
      />
    </div>
  );
};

export default (
  c: { [key: string]: any },
  i: any,
  ListPanel: any,
  state: { [key: string]: any },
  setState: Function,
  fns: any,
  D: any,
  publicURI: string
) => {
  return <Panel fns={fns} D={D} ListPanel={ListPanel} publicURI={publicURI} />;
};
