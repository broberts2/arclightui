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
      <ListPanel
        Request={{
          index: "community",
          type: `(M) summoner`,
          search: { limit: 32 },
        }}
        fns={fns}
        D={D}
        card={(c: any) => ({
          img: c.img,
          subtext: c.name,
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
