import React from "react";

const Panel = (props) => {
  const scriptContext = props.fns.parseAdminDomainState().script;
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
          type: "Script",
          search: { limit: 32 },
          local: true,
        }}
        fns={props.fns}
        D={{
          Script: {
            records:
              scriptContext && props.D.getscripts.records[scriptContext]
                ? Object.keys(props.D.getscripts.records[scriptContext]).map(
                    (k: string) => {
                      const metadata = JSON.parse(
                        props.D.getscripts.records[scriptContext][k].metadata
                      );
                      return {
                        img: `https://highmountainlabs.io/cdn/arclight/media/${
                          metadata.managed ? "js-m" : "js"
                        }.jpg`,
                        subtext: metadata.name,
                        onClick: () => {
                          props.fns.setAdminDomainState({
                            ...props.fns.parseAdminDomainState(),
                            activePanel: 2,
                            selectedscript: k,
                          });
                        },
                      };
                    }
                  )
                : [],
          },
        }}
        card={(c: any) => ({
          img: c.img,
          subtext: c.subtext,
          onClick: c.onClick,
        })}
        line={false}
        constrain
      />
    </div>
  );
};

export default (obj: any) => {
  return (
    <Panel
      fns={obj.fns}
      D={obj.D}
      ListPanel={obj.ListPanel}
      publicURI={obj.publicURI}
    />
  );
};
