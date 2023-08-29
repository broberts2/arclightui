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
      <Card
        line
        bgImg={"https://images6.alphacoders.com/129/1290503.png"}
        bodyComponent={
          <div className={`w-full h-full flex justify-start`}>
            <img
              src={`${endpoint}/static/media/jungle.png`}
              className={`mx-10 w-20 h-20 object-cover rounded-full bg-visibility-primary p-2 border-2 border-background-tertiary`}
            />
            <div className={`flex flex-col justify-center text-xl`}>
              Shalom Time!
            </div>
            <div className={`flex justify-end text-lg mx-10 grow`}>
              <div className={`flex flex-col justify-center space-y-3`}>
                <div
                  className={`hover:text-violet-700`}
                  onClick={() =>
                    fns.routeExternal(
                      `https://www.op.gg/summoners/na/Jetgorilla`
                    )
                  }
                >
                  https://www.op.gg/summoners/na/Jetgorilla
                </div>
                <div
                  className={`hover:text-violet-700`}
                  onClick={() =>
                    fns.routeExternal(
                      `https://www.op.gg/summoners/na/Jetgorilla`
                    )
                  }
                >
                  https://www.op.gg/summoners/na/Jetgorilla
                </div>
              </div>
            </div>
          </div>
        }
        onClick={() => null}
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  );
};

export default Staff;
