import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { TournamentBracket, Page } from "../../components";

const Teams: FC<{
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
        src: "https://images4.alphacoders.com/590/590595.jpg",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <TournamentBracket />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Teams;
