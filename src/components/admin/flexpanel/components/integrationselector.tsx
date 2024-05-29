import React from "react";

const Panel = (props) => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    props.fns.calls.getintegrations();
  }, []);
  if (!props.D || !props.D.getintegrations) return <div />;
  return (
    <div className={`arclight-w-full arclight-h-full arclight-relative`}>
      <div
        className={`arclight-w-full arclight-absolute arclight-top-1/2 arclight-left-1/2 -arclight-translate-x-1/2 -arclight-translate-y-1/2`}
      >
        <div className={`arclight-w-full`}>
          <props.HeroPanel
            index={index}
            rows={1}
            pageCallback={setIndex}
            autoSort={false}
            cards={Object.keys(props.D.getintegrations).map((k: string) => ({
              active: props.D.getintegrations[k].active,
              hoverComponent: (
                <div>
                  <div className={`text-md`}>
                    {props.D.getintegrations[k].decorators.description}
                  </div>
                </div>
              ),
              bgImg: `${props.D.getintegrations[k].decorators.img}`,
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
    </div>
  );
};

export default (obj: any) => {
  return (
    <Panel
      fns={obj.fns}
      D={obj.D}
      HeroPanel={obj.HeroPanel}
      publicURI={obj.publicURI}
    />
  );
};
