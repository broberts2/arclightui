import React from "react";

const Panel = (props) => {
  const [index, setIndex] = React.useState(0);
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <props.HeroPanel
        index={index}
        rows={1}
        pageCallback={setIndex}
        autoSort
        cards={props.C.map((k: string) => ({
          active: props.D.getintegrations[k].active,
          hoverComponent: (
            <div>
              <div className={`text-md`}>
                {props.D.getintegrations[k].decorators.description}
              </div>
            </div>
          ),
          bgImg: `${props.publicURI}/${props.D.getintegrations[k].decorators.img}`,
          subText: k,
          onClick: () =>
            props.fns.setAdminDomainState({
              ...props.fns.parseAdminDomainState(),
              integration: k,
              activePanel: 1,
            }),
        }))}
      />
    </div>
  );
};

export default (
  c: { [key: string]: any },
  i: any,
  HeroPanel: any,
  state: { [key: string]: any },
  setState: Function,
  fns: any,
  D: any,
  publicURI: string
) => {
  const C = D && D.getintegrations ? Object.keys(D.getintegrations) : null;
  return C ? (
    <Panel fns={fns} D={D} HeroPanel={HeroPanel} C={C} publicURI={publicURI} />
  ) : null;
};
