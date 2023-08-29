import React, { FC } from "react";
import { Header } from "../components";

const H: FC<{
  fns: {
    [key: string]: any;
  };
  main?: boolean;
  endpoint?: string;
}> = ({ fns, main, endpoint }) =>
  main ? (
    <Header
      fns={fns}
      logo={{
        src: `${endpoint}/static/media/TES-logo.png`,
        route: "/",
      }}
      linksLeft={[
        {
          icon: "users",
          text: "Content",
          subLinks: [
            {
              icon: "users",
              route: "/content",
              text: "Content",
            },
          ],
        },
        {
          icon: "users",
          route: "/community",
          text: "Community",
        },
        {
          icon: "chart-line",
          route: "/teams",
          text: "Teams and Stats",
        },
        {
          icon: "chess-knight",
          route: "/",
          text: "Crux",
        },
        {
          icon: "chess-knight",
          route: "/bracket",
          text: "Bracket",
        },
      ]}
      linksRight={[
        { icon: "user-astronaut", route: "/staff", text: "Staff" },
        { icon: "scroll", route: "/application", text: "Applications" },
        fns.readToken()._token
          ? {
              icon: "scroll",
              route: "/profile",
              text: "My Profile",
            }
          : { icon: "scroll", route: "/login", text: "Login" },
        fns.readToken()._token
          ? {
              icon: "scroll",
              route: "/",
              text: "Sign Out",
              onClick: () => {
                fns.writeToken();
              },
            }
          : null,
      ]}
      socialMediaLeft={[
        {
          routeExternal: "https://discord.com/invite/Mgs6Xj4pCm",
          icon: "discord",
        },
        {
          route: "/",
          icon: "twitch",
        },
        {
          route: "/",
          icon: "twitter",
        },
      ]}
      socialMediaRight={[
        {
          route: "/",
          icon: "reddit",
        },
        {
          route: "/",
          icon: "youtube",
        },
        {
          route: "/",
          icon: "facebook",
        },
      ]}
    />
  ) : (
    <Header
      fns={fns}
      logo={{
        src: `${endpoint}/static/media/TES-logo.png`,
        route: "/",
      }}
      links={[
        { icon: "users", route: "/content", text: "Content" },
        { icon: "users", route: "/community", text: "Community" },
        { icon: "chart-line", route: "/teams", text: "Teams and Stats" },
        { icon: "chess-knight", route: "/", text: "Crux" },
        {
          icon: "chess-knight",
          route: "/bracket",
          text: "Bracket",
        },
        { icon: "user-astronaut", route: "/staff", text: "Staff" },
        { icon: "scroll", route: "/application", text: "Applications" },
        fns.readToken()._token
          ? { icon: "scroll", route: "/profile", text: "My Profile" }
          : { icon: "scroll", route: "/login", text: "Login" },
        fns.readToken()._token
          ? {
              icon: "scroll",
              route: "/",
              text: "Sign Out",
              onClick: () => {
                fns.writeToken();
              },
            }
          : null,
      ]}
      socialMedia={[
        {
          routeExternal: "https://discord.com/invite/Mgs6Xj4pCm",
          icon: "discord",
        },
        {
          route: "/",
          icon: "twitch",
        },
        {
          route: "/",
          icon: "twitter",
        },
        {
          route: "/",
          icon: "reddit",
        },
        {
          route: "/",
          icon: "youtube",
        },
        {
          route: "/",
          icon: "facebook",
        },
      ]}
    />
  );

export default H;
