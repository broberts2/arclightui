import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, ProfilePage, HeroPanel, Card } from "../../components";

const Staff: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const Members = [1, 2, 3];
  return (
    <Page
      fns={fns}
      backgroundImage={{
        src: "http://localhost:7001/static/media/jadevi.jpg",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />

      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  );
};

export default Staff;
