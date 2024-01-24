import React, { FC } from "react";
import {
  CompassViewer,
  EntryPortal,
  HeroPanel,
  ListPanel,
  MissionStatement,
  Page,
  Calendar,
  DateSelector,
} from "../../../components";
import Styles from "./styles";
import moment from "moment";

import Header from "../../../projectcomponents/header";
import Footer from "../../../projectcomponents/footer";
import Button from "../../../projectcomponents/button";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const [heroPanelIndex, setHeroPanelIndex] = React.useState(0);
  return D && fns.calls ? (
    <Page fns={fns} backgroundGradient={{ from: `#283b4c`, to: `#09111c` }}>
      <Header main fns={fns} endpoint={endpoint} />
      <Styles.Container
        className={`arclight-px-10 md:arclight-px-36 xl:arclight-px-72`}
      >
        <Styles.Body className={`arclight-relative arclight-min-h-screen`}>
          <Styles.HeroBody
            className={`arclight-m-auto arclight-relative arclight-flex arclight-space-x-10`}
          >
            <Styles.HeroText className={`arclight-flex arclight-items-center`}>
              <div className={`arclight-flex-col arclight-space-y-4`}>
                <div className={`arclight-text-3xl arclight-my-6`}>
                  Highmountain Labs
                </div>
                {[
                  `Welcome to Highmountainlabs.io, where innovation meets excellence in the realm of software development. As a leading force in the industry, Highmountainlabs specializes in cutting-edge technology stacks, with a primary focus on the MERN (MongoDB, Express.js, React.js, Node.js) stack. Our mission is to empower businesses with robust, scalable, and efficient software solutions that propel them to new heights of success. Whether you're a startup navigating the digital landscape or an established enterprise seeking to optimize your tech infrastructure, Highmountainlabs is your trusted partner for all things software.`,
                  `At the heart of our offerings is the ArclightUI, a state-of-the-art React library that transforms user interfaces into seamless and visually stunning experiences. Designed with a keen eye for aesthetics and functionality, ArclightUI ensures that your applications not only meet but exceed user expectations. Complementing this is our powerful backend server framework, Arclightserver, which forms the backbone of your application's functionality. Together, these tools form a cohesive ecosystem that accelerates the development process, providing you with the tools necessary to stay ahead in today's dynamic digital landscape.`,
                  `Highmountainlabs.io is more than just a software domain; it's a commitment to excellence and a dedication to shaping the future of technology. Join us on a journey where innovation knows no bounds, and together, we'll create software solutions that elevate your business to unprecedented heights.`,
                ].map((t: string) => (
                  <div className={`arclight-text-sm`}>{t}</div>
                ))}
                <Button fns={fns} onClick={() => null}>
                  Some Button
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
        </Styles.Body>
      </Styles.Container>
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Home;
