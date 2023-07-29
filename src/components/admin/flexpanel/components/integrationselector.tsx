import React from "react";

const Panel = (props) => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    props.fns.calls.getintegrations();
  }, []);
  if (!props.D || !props.D.getintegrations) return <div />;
  return (
    <div className={`w-full h-full relative`}>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <props.HeroPanel
          index={index}
          rows={1}
          pageCallback={setIndex}
          autoSort
          cards={Object.keys(props.D.getintegrations).map((k: string) => ({
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
  return <Panel fns={fns} D={D} HeroPanel={HeroPanel} publicURI={publicURI} />;
};
