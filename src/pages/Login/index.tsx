import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, AuthPage } from "../../components";

const Staff: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  return (
    <Page
      fns={fns}
      backgroundImage={{
        src: "https://images3.alphacoders.com/128/1287105.jpg",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <AuthPage
        redirect={"/"}
        D={D}
        fns={fns}
        authBackgroundImage={"https://images7.alphacoders.com/128/1284425.png"}
        OATHOnly={true}
        OATH={[
          {
            type: "discord",
            onClick: () =>
              fns.calls && fns.calls.DiscordOATH2
                ? fns.calls.DiscordOATH2({
                    domain: fns.readState().subdomain,
                  })
                : null,
          },
        ]}
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  );
};

export default Staff;
