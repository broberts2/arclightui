import React, { FC } from "react";
import { HeroPanel, ListPanel, Page } from "../../components";
import Styles from "./styles";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import Button from "../../projectcomponents/button";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  return D && fns.calls ? (
    <Page fns={fns} backgroundGradient={{ from: `#283b4c`, to: `#09111c` }}>
      <Header main fns={fns} endpoint={endpoint} />
      <Styles.Container
        className={`arclight-px-10 md:arclight-px-36 xl:arclight-px-72`}
      >
        <Styles.Body className={`arclight-relative`}>
          <Styles.HeroBody
            className={`arclight-m-auto arclight-relative arclight-flex arclight-space-x-10`}
          >
            <Styles.HeroText className={`arclight-flex arclight-items-center`}>
              <div className={`arclight-flex-col arclight-space-y-4`}>
                <div className={`arclight-text-3xl arclight-my-6`}>
                  Highmountain Labs
                </div>
                <div className={`arclight-text-sm`}>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from.
                </div>
                <div className={`arclight-text-sm`}>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32.
                </div>
                <Button fns={fns} onClick={() => alert("shalom")}>
                  Shalom
                </Button>
              </div>
            </Styles.HeroText>
            <Styles.HeroImg
              className={`arclight-w-0 lg:arclight-w-48 xl:arclight-w-96 arclight-object-cover`}
              src={`http://highmountainlabs.io/arclight/cdn/media/wise_man.png`}
            />
          </Styles.HeroBody>
          {false ? (
            <ListPanel
              key={0}
              controls={[
                {
                  icon: "diamond",
                  text: "name",
                  key: "name",
                },
              ]}
              Request={{
                index: "test",
                type: "user",
                script: "test_script",
                search: {
                  limit: 5,
                  skip: 0,
                },
              }}
              card={(c: any) => ({
                img: "http://highmountainlabs.io/arclight/cdn/media/flask.jpg",
                subtext: c.username,
                onClick: () => console.log("shalom"),
              })}
              fns={fns}
              D={D}
              line={false}
              constrain={true}
            />
          ) : null}
          {/* <ListPanel
            key={1}
            controls={[
              {
                icon: "diamond",
                text: "name",
                key: "name",
              },
            ]}
            Request={{
              index: "test2",
              type: "user",
              // script: "test_script",
              search: {
                limit: 5,
                skip: 0,
              },
            }}
            card={(c: any) => ({
              img: "http://highmountainlabs.io/arclight/cdn/media/flask.jpg",
              subtext: c.username,
              onClick: () => console.log("shalom"),
            })}
            fns={fns}
            D={D}
            line={false}
            constrain={true}
          /> */}
          <div className={`arclight-my-24`}>
            <HeroPanel
              small
              cards={[
                {
                  ht: "Developer reference for ArclightUI",
                  subText: "ArclightUI",
                  img: `http://highmountainlabs.io/arclight/cdn/media/flask.jpg`,
                  route: "/arclightui",
                },
                {
                  locked: true,
                  ht: "Some text for you",
                  img: `http://highmountainlabs.io/arclight/cdn/media/1.jpg`,
                },
                {
                  locked: true,
                  ht: "Some text for you",
                  img: `http://highmountainlabs.io/arclight/cdn/media/1.jpg`,
                },
              ].map((C: { [key: string]: any }) => ({
                locked: C.locked || !fns.readToken()._token,
                subText: C.subText,
                hoverComponent: C.ht ? <div>{C.ht}</div> : undefined,
                bgImg: C.img,
                onClick: () => fns.route(C.route),
              }))}
            />
          </div>
        </Styles.Body>
      </Styles.Container>
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Home;
