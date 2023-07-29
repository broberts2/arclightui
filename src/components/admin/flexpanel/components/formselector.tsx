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
          type: `Form Template`,
          search: { limit: 32 },
        }}
        fns={props.fns}
        D={props.D}
        card={(c: any) => ({
          img: c.backgroundimage,
          subtext: c.title,
          onClick: () => {
            if (props.fns.parseAdminDomainState().item === "Form Template")
              props.fns.setAdminDomainState({
                ...props.fns.parseAdminDomainState(),
                activePanel: 2,
              });
            console.log(props.fns.parseAdminDomainState());
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
