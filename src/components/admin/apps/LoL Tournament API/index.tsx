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
  return (
    <Styles.Container className={`flex justify-center align-middle h-full`}>
      {!fns.parseAdminDomainState().activePanel ? (
        <Styles.SubContainer
          className={`flex flex-col justify-center align-middle h-full`}
        >
          <HeroPanel
            small
            title={"Select a Function"}
            cards={[
              {
                hoverComponent: (
                  <img
                    src={`http://highmountainlabs.io/arclight/cdn/media/purple_essence.png`}
                    className={`w-32 lg:w-64 object-cover`}
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
                hoverComponent: (
                  <img
                    src={`http://highmountainlabs.io/arclight/cdn/media/orange_essence.png`}
                    className={`w-32 lg:w-64 object-cover`}
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
                    className={`w-32 lg:w-64 object-cover`}
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
