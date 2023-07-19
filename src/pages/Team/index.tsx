import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, ProfilePage, HeroPanel } from "../../components";

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
        src: "http://localhost:7001/static/media/jadevi.jpg",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <ProfilePage
        timeline={{
          bgVideo: `http://localhost:7001/static/media/background2.mp4`,
          elements: [],
        }}
        fns={fns}
        title={"Wukong's Divinity Team"}
        panelImg={"http://localhost:7001/static/media/jadewukong3.jpg"}
        profileImg={`http://localhost:7001/static/media/dynasty2.png`}
        Panel={
          <div className={`flex flex-col space-y-0`}>
            <HeroPanel
              small
              title={"Dynasty"}
              cards={[
                {
                  hoverComponent: (
                    <img
                      src={"http://localhost:7001/static/media/dynasty.png"}
                      className={`w-32 lg:w-32 h-32 lg:h-32 object-cover rounded-full border-2 border-l-2 border-r-2 border-b-4 border-background-tertiary`}
                    />
                  ),
                  bgImg: "http://localhost:7001/static/media/jadewukong.jpg",
                  subText: "Wukong Dynasty",
                  onClick: () => fns.route("/dynasty"),
                },
              ]}
            />
          </div>
        }
      />
      <HeroPanel
        small
        title={"Members"}
        cards={[
          {
            img: "http://localhost:7001/static/media/top-lane.png",
            subText: "Braer",
            bgImg: "http://localhost:7001/static/media/ornn.jpg",
          },
          {
            img: "http://localhost:7001/static/media/jungle.png",
            subText: "Khyroe",
            bgImg: "http://localhost:7001/static/media/leesin.png",
          },
          {
            img: "http://localhost:7001/static/media/mid-lane.png",
            subText: "Major1224",
            bgImg: "http://localhost:7001/static/media/malzahar.png",
          },
          {
            img: "http://localhost:7001/static/media/bot-lane.png",
            subText: "Jetgorilla",
            bgImg: "http://localhost:7001/static/media/zeri.jpg",
          },
          {
            img: "http://localhost:7001/static/media/support.png",
            subText: "Phortwenty",
            bgImg: "http://localhost:7001/static/media/yuumi.jpg",
          },
        ].map((el: any) => ({
          bodyComponent: (
            <img
              src={el.img}
              className={`m-auto w-32 h-32 object-cover rounded-full bg-visibility-primary p-2 border-2 border-background-tertiary`}
            />
          ),
          bgImg: el.bgImg,
          subText: el.subText,
          onClick: () => fns.route("/profile"),
        }))}
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  );
};

export default Staff;
