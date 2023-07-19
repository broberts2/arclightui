import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

import { ListPanel, Page, PageTitle, HeroPanel } from "../../components";

const Community: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const [hItem, setHItem] = React.useState(0);
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: "https://images5.alphacoders.com/128/1284420.png",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <PageTitle
        orientation={"center"}
        text={"Community & Leaderboards"}
        fns={fns}
        img={"http://localhost:7001/static/media/test2.png"}
        bg={"http://localhost:7001/static/media/background2.mp4"}
        bgOffset={50}
      />
      <HeroPanel
        small
        cards={[
          {
            active: hItem === 0,
            hoverComponent: (
              <div>
                <div className={`text-md`}>Summoners looking for teams</div>
              </div>
            ),
            bgImg: "https://images6.alphacoders.com/128/1284394.png",
            subText: "Free Agents",
            onClick: () => setHItem(0),
          },
          {
            active: hItem === 1,
            hoverComponent: (
              <div>
                <div className={`text-md`}>
                  Individual player progression and achievements spanning all
                  TES seasons
                </div>
              </div>
            ),
            bgImg: "https://images4.alphacoders.com/128/1287583.jpg",
            subText: "Legends",
            onClick: () => setHItem(1),
          },
          {
            active: hItem === 2,
            hoverComponent: (
              <div>
                <div className={`text-md`}>
                  Team progression and achievements spanning all TES seasons
                </div>
              </div>
            ),
            bgImg: "https://images6.alphacoders.com/128/1284389.png",
            subText: "Dynasties",
            onClick: () => setHItem(2),
          },
        ]}
      />
      <ListPanel
        Request={{
          index: "community",
          type: hItem ? `dynasty` : `user`,
          search: hItem
            ? { limit: 32 }
            : { username: { $ne: "administrator" }, limit: 32 },
        }}
        fns={fns}
        D={D}
        card={(c: any) => ({
          img: c.img,
          subtext: hItem ? c.name : c.username,
          onClick: () => null,
        })}
        line={false}
        constrain
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Community;
