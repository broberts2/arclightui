import React, { FC } from "react";
import HeroPanel from "../../../heropanel";
import panels from "./panels";
import Controls from "./controls";
import Styles from "./styles";

const LoLTournamentAPI: FC<{
  state: { [key: string]: any };
  setState: Function;
  D: { [key: string]: any };
  fns: { [key: string]: any };
  publicURI: string;
}> = ({ state, setState, D, fns, publicURI }) => {
  const [index, setIndex] = React.useState(0);
  return (
    <Styles.Container
      className={`arclight-flex arclight-justify-center arclight-align-middle arclight-h-full`}
    >
      {!fns.parseAdminDomainState().activePanel ? (
        <Styles.SubContainer
          className={`arclight-flex arclight-flex-col arclight-justify-center arclight-align-middle arclight-h-full arclight-w-full`}
        >
          <HeroPanel
            index={index}
            small
            rows={1}
            title={"Select a Function"}
            pageCallback={setIndex}
            cards={[
              {
                hoverComponent: (
                  <img
                    src={`http://highmountainlabs.io/arclight/cdn/media/purple_essence.png`}
                    className={`arclight-w-32 lg:arclight-w-64 arclight-object-cover`}
                  />
                ),
                bgImg: `http://highmountainlabs.io/arclight/cdn/media/ionia_1.jpg`,
                subText: "Tournament Codes",
                onClick: () =>
                  fns.setAdminDomainState({
                    ...fns.parseAdminDomainState(),
                    activePanel: 1,
                    subItem: "Tournament Codes",
                  }),
              },
              {
                locked: true,
                hoverComponent: (
                  <img
                    src={`http://highmountainlabs.io/arclight/cdn/media/orange_essence.png`}
                    className={`arclight-w-32 lg:arclight-w-64 arclight-object-cover`}
                  />
                ),
                bgImg: `http://highmountainlabs.io/arclight/cdn/media/ionia_2.png`,
                subText: "Authenticate Summoner",
                onClick: () =>
                  fns.setAdminDomainState({
                    ...fns.parseAdminDomainState(),
                    activePanel: 1,
                    subItem: "Authenticate Summoner",
                  }),
              },
              {
                locked: true,
                hoverComponent: (
                  <img
                    src={`http://highmountainlabs.io/arclight/cdn/media/blue_essence.png`}
                    className={`arclight-w-32 lg:arclight-w-64 arclight-object-cover`}
                  />
                ),
                bgImg: `http://highmountainlabs.io/arclight/cdn/media/ionia_3.jpg`,
                subText: "Insert Forfeit",
                onClick: () =>
                  fns.setAdminDomainState({
                    ...fns.parseAdminDomainState(),
                    activePanel: 1,
                    subItem: "Insert Forfeit",
                  }),
              },
              {
                locked: true,
                hoverComponent: (
                  <img
                    src={`http://highmountainlabs.io/arclight/cdn/media/blue_essence.png`}
                    className={`arclight-w-32 lg:arclight-w-64 arclight-object-cover`}
                  />
                ),
                bgImg: `http://highmountainlabs.io/arclight/cdn/media/ionia_3.jpg`,
                subText: "Import Game Data",
                onClick: () =>
                  fns.setAdminDomainState({
                    ...fns.parseAdminDomainState(),
                    activePanel: 1,
                    subItem: "Import Game Data",
                  }),
              },
            ]}
          />
        </Styles.SubContainer>
      ) : (
        panels(
          fns.parseAdminDomainState().activePanel,
          publicURI,
          fns,
          D,
          Controls,
          state,
          setState
        )
      )}
    </Styles.Container>
  );
};

export default LoLTournamentAPI;
