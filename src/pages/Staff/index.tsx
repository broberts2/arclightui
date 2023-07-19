import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { HeroPanel, Page, PageTitle } from "../../components";

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
        src: "https://images7.alphacoders.com/128/1288865.png",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <PageTitle
        orientation={"center"}
        text={"TES Staff"}
        fns={fns}
        img={
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9eb92786-5e60-46ac-ae2c-d33af137f691/d9260vv-4ae35200-9ee9-420d-ac95-b3f3956fcfd0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzllYjkyNzg2LTVlNjAtNDZhYy1hZTJjLWQzM2FmMTM3ZjY5MVwvZDkyNjB2di00YWUzNTIwMC05ZWU5LTQyMGQtYWM5NS1iM2YzOTU2ZmNmZDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0C5dQwwEqUyTv2F7autgkQLo5OicOkBj2MHDDYzg2xs"
        }
        bg={"http://localhost:7001/static/media/background1.mp4"}
        bgOffset={-50}
      />
      <HeroPanel
        title={"Administrators"}
        small
        left={false}
        autoSort
        cards={[
          {
            hoverComponent: (
              <div>
                <div className={`text-xl`}>Developer</div>
                <div className={`text-md`}>
                  Responsible for Crux, Website, Discord Bot, RIOT Games API
                </div>
              </div>
            ),
            bgImg: "http://localhost:7001/static/media/azir.jpg",
            subText: "Jetgorilla",
            onClick: () => fns.route("/"),
          },
          {
            hoverComponent: (
              <div>
                <div className={`text-xl`}>League Director</div>
                <div className={`text-md`}>
                  Responsible for Gladiator League, Conqueror League, Game Stats
                  interface, Player Inegrity, Partnerships
                </div>
              </div>
            ),
            bgImg: "http://localhost:7001/static/media/nilah.jpg",
            subText: "Semz",
            onClick: () => fns.route("/"),
          },
          {
            hoverComponent: (
              <div>
                <div className={`text-xl`}>League Director</div>
                <div className={`text-md`}>
                  Responsible for Production, Graphic Media, Youtube, Twitch,
                  Partnerships
                </div>
              </div>
            ),
            bgImg: "http://localhost:7001/static/media/leesin.png",
            subText: "Phortwenty",
            onClick: () => fns.route("/"),
          },
        ]}
      />
      <div className={"h-16"} />
      <HeroPanel
        title={"Directors"}
        small
        left={false}
        autoSort
        cards={[
          {
            hoverComponent: (
              <div>
                <div className={`text-xl`}>League Director</div>
                <div className={`text-md`}>
                  Responsible for Divinity League, Player Inegrity
                </div>
              </div>
            ),
            bgImg: "http://localhost:7001/static/media/ornn.jpg",
            subText: "Batman",
            onClick: () => fns.route("/"),
          },
          {
            hoverComponent: (
              <div>
                <div className={`text-xl`}>Finance Director</div>
                <div className={`text-md`}>
                  Responsible for TES Paypal, Treasury
                </div>
              </div>
            ),
            bgImg: "http://localhost:7001/static/media/soraka.jpg",
            subText: "ℚʊякїї",
            onClick: () => fns.route("/"),
          },
        ]}
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  );
};

export default Staff;
