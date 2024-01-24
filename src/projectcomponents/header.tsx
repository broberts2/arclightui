import React, { FC } from "react";
import { Header } from "../components";

const H: FC<{
  fns: {
    [key: string]: any;
  };
  main?: boolean;
  endpoint?: string;
}> = ({ fns, main, endpoint }) => {
  return (
    <div className={`arclight-px-44`}>
      <Header
        fns={fns}
        logo={{
          src: `http://highmountainlabs.io/arclight/cdn/media/highmountainlabs.png`,
          route: "/",
        }}
        links={[
          {
            route: "/",
            text: "Home",
          },
          fns.readToken()._token
            ? {
                icon: "scroll",
                route: "/",
                text: "Logout",
                onClick: () => fns.writeToken(),
              }
            : { icon: "scroll", route: "/login", text: "Login" },
        ]}
        socialMedia={[]}
      />
    </div>
  );
};

export default H;
